<script setup lang="ts">
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField } from '@/components/ui/form'

const isDialogOpen = ref(false)
const selectedEmoji = ref<number | null>(null)

const emojiIcons = [
  'i-bi-hand-thumbs-up-fill',
  'i-bi-hand-thumbs-down-fill',
]

const formSchema = toTypedSchema(z.object({
  feedback: z.string().min(1, { message: 'feedback_validation_feedback_required' }),
  files: z.array(z.any()).optional(),
  shouldContact: z.boolean().default(false),
  name: z.string().optional(),
  email: z.string().email({ message: 'feedback_validation_email_invalid' }).optional(),
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

const { t } = useI18n({
  useScope: 'local',
})
// TODO: Feedback should be sent immediately when clicking the emoji, addtionally, we should submit the form when clicking the submit button
</script>

<template>
  <ClientOnly>
    <div class="not-prose flex h-12 max-w-fit items-center justify-center rounded-full bg-background p-4 shadow-md ring-1 ring-border">
      <div class="flex items-center">
        <p class="text-sm font-normal text-muted-foreground">
          {{ t('feedback_question') }}
        </p>
        <div class="ml-2 flex space-x-1">
          <button
            v-for="(icon, index) in emojiIcons"
            :key="icon"
            :aria-label="t('feedback_emoji_aria', { index: index + 1 })"
            class="flex size-8 items-center justify-center rounded-full hover:scale-110 hover:text-primary focus:outline-none"
            type="button"
            @click="openDialog(index)"
          >
            <Icon :name="icon" class="size-[18px] text-foreground" />
          </button>
        </div>
      </div>
    </div>

    <UiDialog v-model:open="isDialogOpen">
      <UiDialogContent class="sm:max-w-xl bg-svg dark:bg-svg-dark dark:ring-1 dark:ring-foreground/15">
        <UiDialogHeader>
          <UiDialogTitle class="text-foreground">
            {{ t('feedback_title') }}
          </UiDialogTitle>
          <UiDialogDescription class="text-muted-foreground">
            {{ t('feedback_description') }}
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="mb-4 flex justify-center space-x-2">
          <button
            v-for="(icon, index) in emojiIcons"
            :key="icon"
            :aria-label="t('feedback_emoji_aria', { index: index + 1 })"
            class="flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:text-primary"
            :class="[
              selectedEmoji === index ? 'scale-110 text-primary' : 'opacity-50',
            ]"
            type="button"
            @click="selectedEmoji = index"
          >
            <Icon :name="icon" class="size-7" :class="selectedEmoji === index ? 'text-primary' : 'text-muted-foreground'" />
          </button>
        </div>

        <form v-auto-animate class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="feedback">
            <UiFormItem>
              <UiFormLabel class="text-foreground">
                {{ t('feedback_form_feedback_label') }}
              </UiFormLabel>
              <UiFormControl>
                <UiTextarea 
                  v-bind="componentField" 
                  :placeholder="t('feedback_form_feedback_placeholder')" 
                  class="border-input bg-background" 
                />
              </UiFormControl>
              <UiFormMessage class="text-destructive" />
            </UiFormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="files">
            <UiFormItem>
              <UiFormLabel class="text-foreground">
                {{ t('feedback_form_files_label') }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput type="file" v-bind="componentField" multiple class="border-input bg-background" />
              </UiFormControl>
            </UiFormItem>
          </FormField>

          <FormField v-slot="{ value, handleChange }" name="shouldContact">
            <UiFormItem class="flex flex-row items-center justify-between rounded-lg border border-border p-4">
              <div class="space-y-0.5">
                <UiFormLabel class="text-base text-foreground">
                  {{ t('feedback_form_contact_label') }}
                </UiFormLabel>
              </div>
              <UiFormControl>
                <UiSwitch
                  class="dark:ring-foreground/50 ring-1 data-[state=unchecked]:ring-border/50"
                  :checked="value"
                  @update:checked="handleChange"
                />
              </UiFormControl>
            </UiFormItem>
          </FormField>

          <div v-if="values.shouldContact" v-auto-animate class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <UiFormItem>
                <UiFormLabel class="text-foreground">
                  {{ t('feedback_form_name_label') }}
                </UiFormLabel>
                <UiFormControl>
                  <UiInput 
                    v-bind="componentField" 
                    class="border-input bg-background" 
                  />
                </UiFormControl>
              </UiFormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <UiFormItem>
                <UiFormLabel class="text-foreground">
                  {{ t('feedback_form_email_label') }}
                </UiFormLabel>
                <UiFormControl>
                  <UiInput 
                    v-bind="componentField" 
                    type="email" 
      
                    class="border-input bg-background" 
                  />
                </UiFormControl>
              </UiFormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="telephone">
              <UiFormItem>
                <UiFormLabel class="text-foreground">
                  {{ t('feedback_form_telephone_label') }}
                </UiFormLabel>
                <UiFormControl>
                  <UiInput 
                    v-bind="componentField" 
                    type="tel" 
                    class="border-input bg-background" 
                  />
                </UiFormControl>
              </UiFormItem>
            </FormField>
          </div>

          <UiDialogFooter>
            <UiButton type="submit" class="bg-primary text-primary-foreground hover:bg-primary/90">
              {{ t('feedback_form_submit') }}
            </UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </ClientOnly>
</template>

<i18n lang="yaml">
en:
  feedback_question: "What do you think?"
  feedback_emoji_aria: "Select emoji {index}"
  feedback_title: "Provide Feedback"
  feedback_description: "We appreciate your feedback. Thank you for sharing your thoughts with us."
  feedback_form_feedback_label: "Feedback"
  feedback_form_feedback_placeholder: "Your Feedback"
  feedback_form_files_label: "Upload Files"
  feedback_form_contact_label: "Should we get back to you?"
  feedback_form_name_label: "Name"
  feedback_form_name_placeholder: "Your Name"
  feedback_form_email_label: "Email"
  feedback_form_telephone_label: "Telephone"
  feedback_form_telephone_placeholder: "Your Phone Number"
  feedback_form_submit: "Submit Feedback"
  feedback_validation_feedback_required: "Feedback is required"
  feedback_validation_email_invalid: "Please enter a valid email address"
de:
  feedback_question: "Was denkst du?"
  feedback_emoji_aria: "Emoji {index} auswählen"
  feedback_title: "Feedback geben"
  feedback_description: "Wir schätzen dein Feedback. Vielen Dank, dass du deine Gedanken mit uns teilst."
  feedback_form_feedback_label: "Feedback"
  feedback_form_feedback_placeholder: "Dein Feedback"
  feedback_form_files_label: "Dateien hochladen"
  feedback_form_contact_label: "Sollen wir uns bei dir melden?"
  feedback_form_name_label: "Name"
  feedback_form_name_placeholder: "Dein Name"
  feedback_form_email_label: "E-Mail"
  feedback_form_telephone_label: "Telefon"
  feedback_form_telephone_placeholder: "Deine Telefonnummer"
  feedback_form_submit: "Feedback senden"
  feedback_validation_feedback_required: "Feedback ist erforderlich"
  feedback_validation_email_invalid: "Bitte gib eine gültige E-Mail-Adresse ein"
</i18n>