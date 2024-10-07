<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const isDialogOpen = ref(false)
const selectedEmoji = ref<number | null>(null)

const emojiIcons = [
  'i-bi-emoji-smile-fill',
  'i-bi-emoji-neutral-fill',
  'i-bi-emoji-frown-fill',
]

const formSchema = toTypedSchema(z.object({
  feedback: z.string().min(1, 'Feedback is required'),
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

function openDialog(emojiIndex: number) {
  selectedEmoji.value = emojiIndex
  isDialogOpen.value = true
}
// TODO: Feedback should be sent immediately when clicking the emoji, addtionally, we should submit the form when clicking the submit button
</script>

<template>
  <ClientOnly>
    <div class="not-prose flex h-12 max-w-fit items-center justify-center rounded-full bg-gray-b-0 p-4 shadow-md ring-1 ring-gray-o-1">
      <div class="flex items-center">
        <p class="text-sm font-normal text-gray-t-2">
          What do you think?
        </p>
        <div class="ml-2 flex space-x-1">
          <button
            v-for="(icon, index) in emojiIcons"
            :key="icon"
            :aria-label="`Select emoji ${index + 1}`"
            class="flex size-8 items-center justify-center rounded-full hover:scale-110 hover:text-prime-i-2 focus:outline-none"
            type="button"
            @click="openDialog(index)"
          >
            <Icon :name="icon" class="size-[18px] text-gray-t-3" />
          </button>
        </div>
      </div>
    </div>

    <UiDialog v-model:open="isDialogOpen">
      <UiDialogContent class="sm:max-w-xl">
        <UiDialogHeader>
          <UiDialogTitle class="text-gray-t-1">
            Provide Feedback
          </UiDialogTitle>
          <UiDialogDescription class="text-gray-t-3">
            We appreciate your feedback. Thank you for sharing your thoughts with us.
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="mb-4 flex justify-center space-x-2">
          <button
            v-for="(icon, index) in emojiIcons"
            :key="icon"
            :aria-label="`Select emoji ${index + 1}`"
            class="flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:text-prime-i-2"
            :class="[
              selectedEmoji === index ? 'scale-110 text-prime-i-2' : 'opacity-50',
            ]"
            type="button"
            @click="selectedEmoji = index"
          >
            <Icon :name="icon" class="size-7" :class="selectedEmoji === index ? 'text-prime-c-2' : 'text-gray-t-3'" />
          </button>
        </div>

        <form v-auto-animate class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="feedback">
            <UiFormItem>
              <UiFormLabel class="text-gray-t-2">
                Feedback
              </UiFormLabel>
              <UiFormControl>
                <UiTextarea v-bind="componentField" placeholder="Your Feedback" class="border-gray-o-1 bg-gray-b-0" />
              </UiFormControl>
              <UiFormMessage class="text-prime-c-1" />
            </UiFormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="files">
            <UiFormItem>
              <UiFormLabel class="text-gray-t-2">
                Upload Files
              </UiFormLabel>
              <UiFormControl>
                <UiInput type="file" v-bind="componentField" multiple class="border-gray-o-1 bg-gray-b-0" />
              </UiFormControl>
            </UiFormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="shouldContact">
            <UiFormItem class="flex flex-row items-center justify-between rounded-lg border border-gray-o-1  p-4">
              <div class="space-y-0.5">
                <UiFormLabel class="text-base text-gray-t-2">
                  Should we get back to you?
                </UiFormLabel>
              </div>
              <UiFormControl>
                <UiSwitch
                  :checked="value"
                  @update:checked="handleChange"
                />
              </UiFormControl>
            </UiFormItem>
          </FormField>

          <div v-if="values.shouldContact" v-auto-animate class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <UiFormItem>
                <UiFormLabel class="text-gray-t-2">
                  Name
                </UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" placeholder="Your Name" class="border-gray-o-1 bg-gray-b-0" />
                </UiFormControl>
              </UiFormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <UiFormItem>
                <UiFormLabel class="text-gray-t-2">
                  Email
                </UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" type="email" placeholder="your@email.com" class="border-gray-o-1 bg-gray-b-0" />
                </UiFormControl>
              </UiFormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="telephone">
              <UiFormItem>
                <UiFormLabel class="text-gray-t-2">
                  Telephone
                </UiFormLabel>
                <UiFormControl>
                  <UiInput v-bind="componentField" type="tel" placeholder="Your Phone Number" class="border-gray-o-1 bg-gray-b-0" />
                </UiFormControl>
              </UiFormItem>
            </FormField>
          </div>

          <UiDialogFooter>
            <UiButton type="submit" class="bg-gray-c-1 text-gray-b-0 hover:bg-gray-c-2">
              Submit Feedback
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </ClientOnly>
</template>
