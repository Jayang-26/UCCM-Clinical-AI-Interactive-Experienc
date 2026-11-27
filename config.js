
window.UCCM_CONFIG = {
  experiences: {
    infection: {
      title: 'AI Corneal Infection Classifier',
      logo: './assets/logos/infection_home.png',
      description: 'Select a model to explore.',
      options: [
        {
          label: 'Model 1 · Detect',
          code: 'MODEL 1 · DETECT',
          image: './assets/models/model1_detect.png',
          cases: [
            {
              label: 'Case A',
              code: 'MODEL 1 · CASE A',
              video: 'infection_model_1_case_a.mp4',
              image: './assets/cases/infection_model1_case_a.jpg'
            },
            {
              label: 'Case B',
              code: 'MODEL 1 · CASE B',
              video: 'infection_model_1_case_b.mp4',
              image: './assets/cases/infection_model1_case_b.jpg'
            },
            {
              label: 'Case C',
              code: 'MODEL 1 · CASE C',
              video: 'infection_model1_case_c.mp4',
              image: './assets/cases/infection_model1_case_c.jpg'
            }
          ]
        },
        {
          label: 'Model 2 · Differentiate',
          code: 'MODEL 2 · DIFFERENTIATE',
          image: './assets/models/model2_differentiate.png',
          cases: [
            {
              label: 'Case A',
              code: 'MODEL 2 · CASE A',
              video: 'infection_model_2_case_a.mp4',
              image: './assets/cases/infection_model2_case_a.jpg'
            },
            {
              label: 'Case B',
              code: 'MODEL 2 · CASE B',
              video: 'infection_model_2_case_b.mp4',
              image: './assets/cases/infection_model2_case_b.jpg'
            }
          ]
        },
        {
          label: 'Model 3 · Monitor',
          code: 'MODEL 3 · MONITOR',
          video: 'infection_model_3.mp4',
          image: './assets/models/model3_monitor.png'
        }
      ]
    },

    kerato: {
      title: 'Keratoconus Progression Classifier',
      logo: './assets/logos/keratoconus_home.png',
      description: 'Select a case to explore.',
      options: [
        {
          label: 'Case A',
          code: 'KERATOCONUS · CASE A',
          video: 'keratoconus_video_1.mp4',
          image: './assets/cases/keratoconus_case_a.png'
        },
        {
          label: 'Case B',
          code: 'KERATOCONUS · CASE B',
          video: 'keratoconus_video_2.mp4',
          image: './assets/cases/keratoconus_case_b.png'
        },
        {
          label: 'Case C',
          code: 'KERATOCONUS · CASE C',
          video: 'keratoconus_video_4.mp4',
          image: './assets/cases/keratoconus_case_c.png'
        }
      ]
    },

    kpop: {
      title: 'Keratoplasty Outcome Prediction Model',
      logo: './assets/logos/keratoplasty_home.png',
      options: [
        {
          label: 'KPOP Workflow',
          code: 'KPOP WORKFLOW',
          video: 'kpop_workflow.mp4',
          image: './assets/logos/keratoplasty_home.png'
        }
      ]
    }
  }
};
