  <script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const isDialogOpen = ref(false)

const formSchema = toTypedSchema(z.object({
  request: z.string().min(1, 'Request description is required'),
  files: z.array(z.any()).optional(),
  shouldContact: z.boolean().default(false),
  name: z.string().optional(),
  email: z.string().email().optional(),
  telephone: z.string().optional(),
}))

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: formSchema,
})
  
const onSubmit = handleSubmit((_values) => {
  isDialogOpen.value = false
  resetForm()
})

function openDialog() {
  isDialogOpen.value = true
}
</script>

<template>
  <ClientOnly>
    <LibButton
      variant="outline"
      class="w-full"
      @click="openDialog"
    >
      <Icon name="heroicons:chat-bubble-bottom-center-text-16-solid" class="size-6" />
      Request the next video
    </LibButton>
    <LibDialog v-model:open="isDialogOpen">
      <LibDialogContent class="sm:max-w-xl">
        <LibDialogHeader>
          <LibDialogTitle class="text-gray-t-1">
            Request the next video
          </LibDialogTitle>
          <LibDialogDescription class="text-gray-t-3">
            Let us know what video you'd like to see next!
          </LibDialogDescription>
        </LibDialogHeader>

        <form v-auto-animate class="space-y-4" @submit="onSubmit">
          <LibFormField v-slot="{ componentField }" name="request">
            <LibFormItem>
              <LibFormLabel class="text-gray-t-2">
                Request Description
              </LibFormLabel>
              <LibFormControl>
                <LibTextarea v-bind="componentField" placeholder="Describe the video you'd like to see..." class="border-gray-o-1 bg-gray-b-0" />
              </LibFormControl>
              <LibFormMessage class="text-prime-c-1" />
            </LibFormItem>
          </LibFormField>

          <LibFormField v-slot="{ componentField }" name="files">
            <LibFormItem>
              <LibFormLabel class="text-gray-t-2">
                Upload Files
              </LibFormLabel>
              <LibFormControl>
                <LibInput type="file" v-bind="componentField" multiple accept="image/*,video/*" class="border-gray-o-1 bg-gray-b-0" />
              </LibFormControl>
            </LibFormItem>
          </LibFormField>

          <LibFormField v-slot="{ value, handleChange }" name="shouldContact">
            <LibFormItem class="flex flex-row items-center justify-between rounded-lg border border-gray-o-1 p-4">
              <div class="space-y-0.5">
                <LibFormLabel class="text-base text-gray-t-2">
                  Should we get back to you?
                </LibFormLabel>
              </div>
              <LibFormControl>
                <LibSwitch
                  :checked="value"
                  @update:checked="handleChange"
                />
              </LibFormControl>
            </LibFormItem>
          </LibFormField>

          <div v-if="values.shouldContact" v-auto-animate class="space-y-4">
            <LibFormField v-slot="{ componentField }" name="name">
              <LibFormItem>
                <LibFormLabel class="text-gray-t-2">
                  Name
                </LibFormLabel>
                <LibFormControl>
                  <LibInput v-bind="componentField" placeholder="Your Name" class="border-gray-o-1 bg-gray-b-0" />
                </LibFormControl>
              </LibFormItem>
            </LibFormField>

            <LibFormField v-slot="{ componentField }" name="email">
              <LibFormItem>
                <LibFormLabel class="text-gray-t-2">
                  Email
                </LibFormLabel>
                <LibFormControl>
                  <LibInput v-bind="componentField" type="email" placeholder="your@email.com" class="border-gray-o-1 bg-gray-b-0" />
                </LibFormControl>
              </LibFormItem>
            </LibFormField>

            <LibFormField v-slot="{ componentField }" name="telephone">
              <LibFormItem>
                <LibFormLabel class="text-gray-t-2">
                  Telephone
                </LibFormLabel>
                <LibFormControl>
                  <LibInput v-bind="componentField" type="tel" placeholder="Your Phone Number" class="border-gray-o-1 bg-gray-b-0" />
                </LibFormControl>
              </LibFormItem>
            </LibFormField>
          </div>

          <LibDialogFooter>
            <LibButton type="submit" class="bg-gray-c-1 text-gray-b-0 hover:bg-gray-c-2">
              Submit Request
            </LibButton>
          </LibDialogFooter>
        </form>
      </LibDialogContent>
    </LibDialog>
  </ClientOnly>
</template>
