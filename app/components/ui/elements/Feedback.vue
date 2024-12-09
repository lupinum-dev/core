<script setup lang="ts">
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField } from '@/components/ui/form'

const isDialogOpen = ref(false)
const selectedEmoji = ref<number | null>(null)
const isSubmitting = ref(false)
const formMessage = ref('')

const route = useRoute()
const { locale } = useI18n()

const emojiIcons = [
  'i-bi-hand-thumbs-up-fill',
  'i-bi-hand-thumbs-down-fill',
]

const formSchema = toTypedSchema(z.object({
  feedback: z.string().min(1, { message: 'feedback_validation_feedback_required' }),
  shouldContact: z.boolean().default(false),
  name: z.string().optional(),
  email: z.string().email({ message: 'feedback_validation_email_invalid' }).optional(),
  telephone: z.string().optional(),
}))

const { handleSubmit, resetForm, values } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true
    formMessage.value = ''
    
    const formData = new FormData()
    // Add all form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString())
      }
    })
    
    // Add emoji feedback type and metadata
    formData.append('feedbackType', selectedEmoji.value === 0 ? 'positive' : 'negative')
    formData.append('currentRoute', route.path)
    formData.append('language', locale.value)

    const response = await fetch('https://usebasin.com/f/754a945a80d7', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      isDialogOpen.value = false
      resetForm()
    } else {
      const data = await response.json()
      formMessage.value = data.error || t('feedback_error_generic')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    formMessage.value = t('feedback_error_generic')
  } finally {
    isSubmitting.value = false
  }
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

          <p v-if="formMessage" class="text-sm text-destructive">
            {{ formMessage }}
          </p>

          <UiDialogFooter>
            <UiButton 
              type="submit" 
              class="bg-primary text-primary-foreground hover:bg-primary/90"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? t('feedback_form_submitting') : t('feedback_form_submit') }}
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
  feedback_form_contact_label: "Should we get back to you?"
  feedback_form_name_label: "Name"
  feedback_form_name_placeholder: "Your Name"
  feedback_form_email_label: "Email"
  feedback_form_telephone_label: "Telephone"
  feedback_form_telephone_placeholder: "Your Phone Number"
  feedback_form_submit: "Submit Feedback"
  feedback_validation_feedback_required: "Feedback is required"
  feedback_validation_email_invalid: "Please enter a valid email address"
  feedback_error_generic: "Something went wrong. Please try again."
  feedback_form_submitting: "Submitting..."
de:
  feedback_question: "Was denkst du?"
  feedback_emoji_aria: "Emoji {index} auswählen"
  feedback_title: "Feedback geben"
  feedback_description: "Wir schätzen dein Feedback. Vielen Dank, dass du deine Gedanken mit uns teilst."
  feedback_form_feedback_label: "Feedback"
  feedback_form_feedback_placeholder: "Dein Feedback"
  feedback_form_contact_label: "Sollen wir uns bei dir melden?"
  feedback_form_name_label: "Name"
  feedback_form_name_placeholder: "Dein Name"
  feedback_form_email_label: "E-Mail"
  feedback_form_telephone_label: "Telefon"
  feedback_form_telephone_placeholder: "Deine Telefonnummer"
  feedback_form_submit: "Feedback senden"
  feedback_validation_feedback_required: "Feedback ist erforderlich"
  feedback_validation_email_invalid: "Bitte gib eine gültige E-Mail-Adresse ein"
  feedback_error_generic: "Etwas ist schief gelaufen. Bitte versuche es erneut."
  feedback_form_submitting: "Wird gesendet..."
</i18n>