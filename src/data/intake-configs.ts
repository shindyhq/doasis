export type FieldType = 'text' | 'textarea' | 'email' | 'tel' | 'select' | 'radio' | 'checkbox' | 'range' | 'date';

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  warningIfValue?: {
      value: string | string[];
      message: string;
  };
}

export interface Step {
  title: string;
  fields: Field[];
}

export interface IntakeConfig {
  title: string;
  steps: Step[];
}

const CRISIS_WARNING = `
  <p>Thank you for your honesty. I want to make sure you get the support you need right now. Please:</p>
  <ol class="list-decimal list-inside ml-2 mt-2">
    <li>Call or text <strong>988</strong> (Suicide & Crisis Lifeline) immediately</li>
    <li>Go to your nearest emergency room if you're in immediate danger</li>
    <li>Call a trusted friend or family member to stay with you</li>
  </ol>
  <p class="mt-2">I am not equipped to provide crisis intervention, but I care about your safety. Please reach out to one of these resources immediately.</p>
  <p class="mt-2 text-xs italic">If you're no longer in crisis and want to continue with our session, please contact me directly.</p>
`;

export const INTAKE_CONFIGS: Record<string, IntakeConfig> = {
  consultation: {
    title: 'Free Consultation Pre-Questionnaire',
    steps: [
      {
        title: 'Basic Information',
        fields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'pronouns', label: 'Pronouns', type: 'text', description: 'How would you like to be addressed?' },
          { name: 'location', label: 'Current Location (City, State)', type: 'text', required: true, description: 'Helps me understand time zones and context' },
          { name: 'ageRange', label: 'Age Range', type: 'select', options: ['Prefer not to say', '18-25', '26-35', '36-45', '46-55', '56-65', '66+'] }
        ]
      },
      {
        title: 'Your Current Season',
        fields: [
          { name: 'currentSeason', label: 'In 2-3 sentences, where are you right now in your life?', type: 'textarea', required: true, description: 'What\'s the main thing you\'re navigating? No need to go deep—just give me the landscape.' },
          { name: 'reasonForReachingOut', label: 'What made you reach out now?', type: 'textarea', required: true, description: 'What shifted or happened that brought you to D\'Oasis at this particular moment?' },
          { name: 'desiredOutcome', label: 'If you could walk away with one thing, what would it be?', type: 'textarea', required: true }
        ]
      },
      {
        title: 'Experience & Faith',
        fields: [
          { name: 'pastExperience', label: 'Have you worked with a counselor or coach before?', type: 'radio', options: ['Yes, a counselor/therapist', 'Yes, a coach', 'Yes, both', 'No, this would be my first time'] },
          { name: 'experienceDetails', label: 'If yes, what was helpful? What wasn\'t?', type: 'textarea' },
          { name: 'faithRelationship', label: 'How would you describe your relationship with faith/spirituality right now?', type: 'textarea', description: 'This helps me understand how to hold space for you. There\'s no "right" answer.' }
        ]
      },
      {
        title: 'Logistics & Preferences',
        fields: [
          { name: 'interestArea', label: 'What are you most interested in?', type: 'radio', required: true, options: ['A single Clarity Session', 'Ongoing 1:1 coaching (6 or 12 weeks)', 'Restoration Circles (monthly group)', 'Not sure yet—want to explore options'] },
          { name: 'costConcern', label: 'Is cost a concern?', type: 'radio', required: true, options: ['No, I can invest at full rate', 'Somewhat—I\'d like to hear about payment plans', 'Yes—I\'d need sliding scale or scholarship'] },
          { name: 'questions', label: 'Any questions you want to make sure we address in our consultation?', type: 'textarea' }
        ]
      }
    ]
  },
  clarity: {
    title: 'Clarity Session Intake Form',
    steps: [
      {
        title: 'Contact & Emergency Info',
        fields: [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true },
          { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'address', label: 'Address (City, State)', type: 'text', required: true },
          { name: 'emergencyName', label: 'Emergency Contact Name', type: 'text', required: true },
          { name: 'emergencyPhone', label: 'Emergency Contact Phone', type: 'tel', required: true },
          { name: 'emergencyRelationship', label: 'Relationship to Emergency Contact', type: 'text', required: true }
        ]
      },
      {
        title: 'Current Context',
        fields: [
          { name: 'occupation', label: 'Current occupation/role', type: 'text', description: 'Student, stay-at-home parent, entrepreneur, teacher, etc.' },
          { name: 'relationshipStatus', label: 'Relationship status', type: 'select', options: ['Single', 'In a relationship', 'Married/Partnered', 'Separated/Divorced', 'Widowed', 'It\'s complicated', 'Prefer not to say'] },
          { name: 'hasChildren', label: 'Do you have children?', type: 'radio', options: ['Yes', 'No', 'Prefer not to say'] },
          { name: 'childrenAges', label: 'If yes, ages:', type: 'text' }
        ]
      },
      {
        title: 'The Challenge',
        fields: [
          { name: 'mainChallenge', label: 'What\'s the main challenge you want to work on?', type: 'textarea', required: true, description: 'Be specific. What\'s keeping you up at night?' },
          { name: 'duration', label: 'How long have you been dealing with this?', type: 'radio', required: true, options: ['Days/weeks (recent)', 'Months', 'Years', 'It\'s been ongoing for as long as I can remember'] },
          { name: 'impactScale', label: 'How much is this affecting your daily life? (1-10)', type: 'range', min: 1, max: 10, required: true },
          { name: 'triedMethods', label: 'What have you already tried to address this?', type: 'textarea', required: true, description: 'Therapy, journaling, prayer, etc.' },
          { name: 'emotions', label: 'Name the emotion(s) you\'re feeling most right now', type: 'checkbox', options: ['Stuck / Trapped', 'Overwhelmed / Anxious', 'Sad / Grieving', 'Confused / Lost', 'Angry / Frustrated', 'Scared / Uncertain', 'Tired / Burnt out', 'Hopeful but unsure', 'Numb / Disconnected', 'Shame / Guilt', 'Other'] }
        ]
      },
      {
        title: 'Health & Wellness',
        fields: [
          { name: 'diagnosis', label: 'Have you ever been diagnosed with a mental health condition?', type: 'radio', options: ['Yes', 'No', 'Prefer not to say'] },
          { name: 'diagnosisDetails', label: 'If yes, please share what feels comfortable', type: 'textarea' },
          { name: 'currentTherapy', label: 'Are you currently working with a therapist?', type: 'radio', options: ['Yes', 'No', 'Not currently, but in past'] },
          { name: 'medication', label: 'Are you currently taking any medication for mental health?', type: 'radio', options: ['Yes', 'No', 'Prefer not to say'] },
          { name: 'symptoms', label: 'In the past month, have you experienced:', type: 'checkbox', options: ['Difficulty sleeping', 'Changes in appetite', 'Loss of interest', 'Difficulty concentrating', 'Feelings of hopelessness', 'Thoughts of self-harm', 'Panic attacks', 'None of the above'] },
          { 
              name: 'harmThoughts', 
              label: 'CRITICAL: Are you currently having thoughts of harming yourself or others?', 
              type: 'radio', 
              required: true, 
              options: ['No', 'Yes'],
              warningIfValue: {
                  value: 'Yes',
                  message: CRISIS_WARNING
              }
          }
        ]
      },
      {
        title: 'Faith & Hope',
        fields: [
          { name: 'faithImportance', label: 'How important is faith/spirituality in your life?', type: 'range', min: 1, max: 10 },
          { name: 'faithCommunity', label: 'Do you have a faith community?', type: 'radio', options: ['Yes, source of support', 'Yes, complicated', 'Questioning/stepping back', 'No, comfortable with that', 'No, but exploring'] },
          { name: 'faithWrestling', label: 'Anything about faith you\'re wrestling with?', type: 'textarea' },
          { name: 'desiredSuccess', label: 'What would make you feel "That was exactly what I needed"?', type: 'textarea', required: true },
          { name: 'fears', label: 'Is there anything you\'re afraid I might ask?', type: 'textarea' }
        ]
      },
      {
        title: 'Consent',
        fields: [
          { name: 'consent_no_therapy', label: 'I understand that coaching is not therapy.', type: 'checkbox', options: ['I Agree'], required: true },
          { name: 'consent_confidentiality', label: 'I understand confidentiality limits.', type: 'checkbox', options: ['I Agree'], required: true },
          { name: 'consent_cancellation', label: 'I understand the cancellation policy.', type: 'checkbox', options: ['I Agree'], required: true },
          { name: 'signature', label: 'Digital Signature (Full Name)', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true }
        ]
      }
    ]
  },
  coaching: {
    title: '1:1 Coaching Comprehensive Intake',
    steps: [
      {
          title: 'Section 1: Personal Info',
          fields: [
              { name: 'fullLegalName', label: 'Full Legal Name', type: 'text', required: true },
              { name: 'preferredName', label: 'Name You Go By', type: 'text', required: true },
              { name: 'pronouns', label: 'Pronouns', type: 'text' },
              { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Phone', type: 'tel', required: true },
              { name: 'address', label: 'Mailing Address', type: 'textarea' },
              { name: 'timezone', label: 'Time Zone', type: 'select', options: ['Eastern', 'Central', 'Mountain', 'Pacific', 'Other'] },
              { name: 'preferredTime', label: 'Preferred Session Day/Time', type: 'text', placeholder: 'e.g. Tuesday mornings' },
              { name: 'emergencyName', label: 'Emergency Contact Name', type: 'text', required: true },
              { name: 'emergencyRelationship', label: 'Relationship', type: 'text', required: true },
              { name: 'emergencyPhone', label: 'Emergency Phone', type: 'tel', required: true },
              { name: 'emergencyAware', label: 'Are they aware you\'re doing this work?', type: 'radio', options: ['Yes, supportive', 'Yes, but don\'t understand', 'No', 'Complicated'] }
          ]
      },
      {
          title: 'Section 2: Current Life',
          fields: [
              { name: 'lifeSeason', label: 'What\'s your current life stage/season?', type: 'textarea', required: true },
              { name: 'occupation', label: 'Current occupation/work', type: 'text', required: true },
              { name: 'relationshipStatus', label: 'Relationship status', type: 'select', options: ['Single', 'Dating', 'Committed', 'Engaged', 'Married/Partnered', 'Separated', 'Divorced', 'Widowed', 'Complicated'] },
              { name: 'relationshipSatisfaction', label: 'Relationship Satisfaction (1-10)', type: 'range', min: 1, max: 10 },
              { name: 'hasChildren', label: 'Do you have children?', type: 'radio', options: ['Yes', 'No'] },
              { name: 'childrenDetails', label: 'If yes, ages and context', type: 'textarea' },
              { name: 'livingSituation', label: 'Who lives with you?', type: 'text' },
              { name: 'physicalHealth', label: 'Physical Health (1-10)', type: 'range', min: 1, max: 10 },
              { name: 'mentalHealth', label: 'Mental/Emotional Health (1-10)', type: 'range', min: 1, max: 10 },
              { name: 'workFulfillment', label: 'Work/Career Fulfillment (1-10)', type: 'range', min: 1, max: 10 },
              { name: 'overallSatisfaction', label: 'Overall Life Satisfaction (1-10)', type: 'range', min: 1, max: 10 },
              { name: 'focusAreas', label: 'Areas of focus (Select up to 3)', type: 'checkbox', options: ['Navigating transition', 'Healing from grief', 'Identity/Self-discovery', 'Building confidence', 'Boundaries', 'Faith/Spiritual growth', 'Relationship patterns', 'Life purpose', 'Overcoming fear', 'Letting go of pain', 'Self-care', 'Other'] }
          ]
      },
      {
          title: 'Section 3: Your Story',
          fields: [
              { name: 'whyNow', label: 'What brought you to this work at this moment?', type: 'textarea', required: true },
              { name: 'youngerSelf', label: 'What would you tell your younger self (5 years ago)?', type: 'textarea' },
              { name: 'proudest', label: 'What are you most proud of about yourself?', type: 'textarea' },
              { name: 'changeWish', label: 'What do you wish you could change about yourself?', type: 'textarea' },
              { name: 'pastChallenge', label: 'Describe a significant transition/challenge you\'ve navigated', type: 'textarea', required: true },
              { name: 'externalView', label: 'What do the people closest to you say you\'re like?', type: 'textarea' }
          ]
      },
      {
          title: 'Section 4: Mental Health',
          fields: [
              { name: 'therapyHistory', label: 'Have you ever been in therapy?', type: 'radio', options: ['Yes, currently', 'Yes, in past', 'No, never', 'Prefer not to say'] },
              { name: 'historyDetails', label: 'If yes, what was helpful? What wasn\'t?', type: 'textarea' },
              { name: 'diagnosis', label: 'Have you been diagnosed with any condition?', type: 'radio', options: ['Yes', 'No', 'Prefer not to say'] },
              { name: 'medication', label: 'Currently taking medication?', type: 'radio', options: ['Yes', 'No', 'Prefer not to say'] },
              { name: 'otherSupport', label: 'Other support professionals?', type: 'checkbox', options: ['Therapist', 'Psychiatrist', 'Doctor', 'Spiritual Director', 'Support Group'] },
              { name: 'experiences', label: 'Have you experienced any of the following?', type: 'checkbox', options: ['Trauma', 'Abuse', 'Significant loss', 'Chronic illness', 'Addiction', 'Eating disorder', 'Self-harm', 'Suicidal thoughts', 'Hospitalization', 'None'] },
              { 
                  name: 'harmThoughts', 
                  label: 'CRITICAL: Are you currently having thoughts of harming yourself or others?', 
                  type: 'radio', 
                  required: true, 
                  options: ['No', 'Yes'],
                  warningIfValue: {
                      value: 'Yes',
                      message: CRISIS_WARNING
                  }
              },
              { name: 'coping', label: 'What helps you when you\'re struggling?', type: 'textarea', required: true }
          ]
      },
      {
          title: 'Sections 5-7: Faith & Goals',
          fields: [
              { name: 'spirituality', label: 'Describe your relationship with faith/spirituality', type: 'textarea', required: true },
              { name: 'faithIntegration', label: 'Importance of integrating faith', type: 'radio', options: ['Very important', 'Somewhat important', 'Not important', 'Not sure'] },
              { name: 'futureVision', label: 'What will have shifted by the end of our work?', type: 'textarea', required: true },
              { name: 'alignedLife', label: 'What does your best, most aligned life look like?', type: 'textarea', required: true },
              { name: 'needs', label: 'What do you need from me to feel safe/supported?', type: 'textarea', required: true }
          ]
      }
    ]
  }
};
