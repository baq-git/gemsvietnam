import { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { CreateUpdateGemSchema } from '@/validates/gems.validate'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Gem, GemCategory } from '@/types/home'
import { useGemLngLat } from '@/stores/home/gemLngLat.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteGem, getGems, postGem, updateGem } from '@/services/gems.service'
import { toast } from 'sonner'
import { getCategories } from '@/services/categories.service'
import { useCreateUpdateForm } from '@/stores/home/form.store'

interface GemPinFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface GemFormValues extends z.infer<typeof CreateUpdateGemSchema> {}

export default function GemPinForm({}: GemPinFormProps) {
  const { formAction, gemId, resetFormState } = useCreateUpdateForm(
    (state) => state
  )
  const {
    gemLngLat,
    locationConfirmed,
    setLocationConfirmed,
    resetGemLngLatState,
  } = useGemLngLat((state) => state)

  const { data: gemCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const { data: gems } = useQuery({
    queryKey: ['gems'],
    queryFn: getGems,
  })

  const queryClient = useQueryClient()
  const mutationGemCreate = useMutation({
    mutationFn: postGem,
    onError: (error) => {
      toast(error.message)
    },
    onSuccess: () => {
      toast('successfully create gem')
      form.reset()
      resetGemLngLatState()
      resetFormState()
      queryClient.invalidateQueries({ queryKey: ['gems'] })
    },
  })
  const mutationGemUpdate = useMutation({
    mutationFn: updateGem,
    onError: (error) => {
      toast(error.message)
    },
    onSuccess() {
      toast('successfully update gem')
      form.reset()
      resetGemLngLatState()
      resetFormState()
      queryClient.invalidateQueries({ queryKey: ['gems'] })
    },
  })
  const mutationGemDelete = useMutation({
    mutationFn: deleteGem,
    onError: (error) => {
      toast(error.message)
    },
    onSuccess() {
      toast('successfully delete gem')
      form.reset()
      resetGemLngLatState()
      resetFormState()
      queryClient.invalidateQueries({ queryKey: ['gems'] })
    },
  })

  function handleLocationConfirm() {
    if (gemLngLat.length > 0) {
      setLocationConfirmed(!locationConfirmed)
    }
  }

  const defaultValues =
    formAction === 'update' ? gems.find((item: Gem) => item.id === gemId) : {}
  const form = useForm<GemFormValues>({
    resolver: zodResolver(CreateUpdateGemSchema),
    defaultValues,
  })

  async function onSubmit(values: GemFormValues) {
    try {
      if (formAction === 'create') {
        const result = await mutationGemCreate.mutateAsync(values)
        console.log(result)
      }
      if (formAction === 'update') {
        console.log(values)
        const result = await mutationGemUpdate.mutateAsync(values)
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id: string) {
    try {
      const result = await mutationGemDelete.mutateAsync(id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (locationConfirmed && gemLngLat.length === 2) {
      const [lng, lat] = gemLngLat
      form.setValue('coordinates', [lng, lat])
      form.clearErrors('coordinates')
    } else {
      form.resetField('coordinates')
      if (gemLngLat.length === 2 && !locationConfirmed) {
        form.setError('coordinates', {
          type: 'manual',
          message: 'location is not confirmed',
        })
      } else {
        form.clearErrors('coordinates')
      }
    }
  }, [gemLngLat, locationConfirmed, form])

  return (
    <div className="p-6">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h1 className="text-2xl font-bold">
              {formAction === 'create' && 'Add New Pin'}
              {formAction === 'update' && 'Update Gem'}
            </h1>
            <div
              className={`bg-muted p-4 rounded-lg flex items-center justify-between ${form.formState.errors['coordinates'] ? 'outline-destructive outline' : ''}`}
            >
              <div>
                <p className="text-sm font-medium">Pin Location</p>
                <p className="text-xs text-muted-foreground">
                  {gemLngLat.length > 0 &&
                    `${gemLngLat[0].toFixed(6)}, ${gemLngLat[1].toFixed(6)}`}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleLocationConfirm}
                type="button"
              >
                <MapPin className="h-4 w-4" />
                {locationConfirmed ? 'Confirmed' : 'Confirm'}
              </Button>
            </div>
            {form.formState.errors['coordinates'] && (
              <p className="text-[0.8rem] mt-2 font-medium text-destructive">
                {form.formState.errors['coordinates'].message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="gemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gem Name</FormLabel>
                  <FormControl>
                    <Input
                      id="gemName"
                      placeholder="Enter pin name (max 100 characters)"
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Describe this pin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How to get there</FormLabel>
                  <FormControl>
                    <Textarea
                      id="instruction"
                      placeholder="input the instruction"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="gemCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {gemCategories?.map((item: GemCategory) => {
                          if (item.categoryName !== 'All')
                            return (
                              <SelectItem key={item.id} value={item.id}>
                                {item.categoryName}
                              </SelectItem>
                            )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <div className="space-y-2"> */}
          {/*   <div className="flex items-center justify-between"> */}
          {/*     <Label>Privacy Level</Label> */}
          {/*     <Button variant="ghost" size="sm" type="button"> */}
          {/*       <Info className="h-4 w-4" /> */}
          {/*     </Button> */}
          {/*   </div> */}
          {/* PREPARE FOR USER AUTHORIZATIN */}
          {/* <RadioGroup */}
          {/*   {...form.register('privacy')} */}
          {/*   className="grid gap-2" */}
          {/* > */}
          {/*   <div className="flex items-center space-x-2"> */}
          {/*     <RadioGroupItem value="public" id="public" /> */}
          {/*     <Label htmlFor="public">Public</Label> */}
          {/*   </div> */}
          {/*   <div className="flex items-center space-x-2"> */}
          {/*     <RadioGroupItem value="private" id="private" /> */}
          {/*     <Label htmlFor="private">Private</Label> */}
          {/*   </div> */}
          {/* </RadioGroup> */}
          {/* </div> */}

          <div className="pt-4 flex w-full gap-2">
            {formAction === 'create' && (
              <Button className="w-full" type="submit">
                Create Gem
              </Button>
            )}
            {formAction === 'update' && (
              <Button className="w-full cursor-pointer" type="submit">
                Update Gem
              </Button>
            )}
          </div>
        </form>
      </Form>
      {formAction === 'update' && (
        <Button
          onClick={() => handleDelete(gemId)}
          className="mt-2 w-full cursor-pointer"
          variant="destructive"
          type="submit"
        >
          Delete Gem
        </Button>
      )}
    </div>
  )
}
