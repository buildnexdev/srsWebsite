import type React from 'react'

/**
 * Team members data: name, profession, and full profile for dropdown + modal.
 * Add the other 3 members' full profiles when you have them.
 */
export interface TeamMember {
  id: string
  name: string
  profession: string
  shortDescription: string
  expertise: string[]
  fullProfile: React.ReactNode
}

export const teamMembers: TeamMember[] = [
  {
    id: 'maria',
    name: 'Maria Jacquilin Mary',
    profession: 'Researcher & Project Manager',
    shortDescription: 'Expert in infectious disease research and epidemiological surveillance. Former Technical Assistant at ICMR with extensive experience in COVID-19 outbreak investigations.',
    expertise: ['Field Epidemiology', 'Data Analysis', 'Protocols'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          Expert in infectious disease research and epidemiological surveillance. Former Technical Assistant at ICMR with extensive experience in COVID-19 outbreak investigations.
        </p>
        <h4>Areas of Expertise</h4>
        <ul>
          <li>Field Epidemiology</li>
          <li>Data Analysis</li>
          <li>Protocols</li>
        </ul>
      </>
    ),
  },
  {
    id: 'uma',
    name: 'Mrs. Uma',
    profession: 'State Co-ordinator',
    shortDescription: 'Specialized training from Emory University, USA. Expert in large-scale manpower supply operations and field coordination across Tamil Nadu.',
    expertise: ['Coordination', 'Management', 'Surveys'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          Specialized training from Emory University, USA. Expert in large-scale manpower supply operations and field coordination across Tamil Nadu.
        </p>
        <h4>Areas of Expertise</h4>
        <ul>
          <li>Coordination</li>
          <li>Management</li>
          <li>Surveys</li>
        </ul>
      </>
    ),
  },
  {
    id: 'elango',
    name: 'R Elango',
    profession: 'Sr. Field Executive',
    shortDescription: 'Over 35 years in research and analytics. Master Trainer for large-scale surveys; 3,000+ projects across India. Expert in field management and quality control.',
    expertise: ['Marketing Research', 'Consumer Insights', 'Social Studies', 'Field Operations'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          Holds a Bachelor's degree in Law and a Doctorate in Economics, with over 35 years of experience in research and analytics. Began the professional journey with ORG-MARG, later continuing through its transition into NIQ-GfK.
        </p>
        <p>
          Over the course of the career, successfully handled and delivered more than 3,000 research projects across India and served as a Master Trainer for large-scale surveys and research programs. Operational and field experience includes major assignments conducted with project execution and monitoring covering all regions of India.
        </p>
        <h4>Areas of Specialization</h4>
        <ul>
          <li>Marketing Research</li>
          <li>Consumer Behaviour & Insights</li>
          <li>Brand & Media Analytics</li>
          <li>Social Studies: Monitoring & Evaluation</li>
        </ul>
        <p>
          In the area of Social Studies and Development Research, projects were undertaken for several Central and State Government departments and leading international development agencies, including World Bank, Planning Commission of India, UNICEF, United Nations Development Programme, USAID, and World Health Organization.
        </p>
        <p>
          Possessing in-depth knowledge of large-scale survey operations, field management systems, and quality control processes, with a proven track record of successfully managing multi-state assignments. Demonstrated ability to coordinate diverse field teams, conduct capacity-building programs, and ensure smooth implementation of complex research projects across Tamil Nadu and Kerala.
        </p>
        <p>
          A dedicated professional with strong organizational, leadership, and communication skills, capable of executing assignments independently while effectively collaborating within team environments.
        </p>
        <h4>Professional Experience</h4>
        <p><strong>From 1994 till date</strong> — Nielsen (India) Private Limited, Coimbatore. <strong>Sr. Field Executive</strong>, India.</p>
        <p>
          R Elango is working as a Sr DA Executive and has experience of over 25 years in issues related to social research. He has experience in rural development, livelihood, rehabilitation, health, water sanitation Program, and communication etc. He has developed specialized skills in conducting In-depth Discussions, Focus Group Discussions. He has good experience of organizing & imparting pieces of training on various social issues in the states of Tamil Nadu and Kerala. Also, he has an experience of co-ordinating social surveys on a large scale, field-level data quality checks, monitoring the progress of fieldwork completion, also coordinating with data entry centres. He has a holistic understanding of the social sector research, having field co-ordinating multiple sectors - including rural development and poverty alleviation, livelihoods, education, maternal and child health and nutrition, governance, water and sanitation, etc.
        </p>
        <p><strong>From 1993-1994</strong> — Department of Anthropology, University of Madras, Madras — Field co-ordinator, India.</p>
        <p><strong>From 1992-1993</strong> — Ministry of Health and Family Welfare – NFHS 2 — Field co-ordinator for Tamilnadu, Kerala and Bihar, India.</p>
        <h4>Detailed Tasks</h4>
        <ul>
          <li>Work closely with the manager, facilitate, and delegate the work to the Supervisors / interviewers / freelancers & work plan for the supervisor</li>
          <li>Summarize, evaluate and update on a regular basis the project status in accordance with the established planning schedules</li>
          <li>Ensuring quality & Productivity at all levels as per the project guidelines</li>
          <li>Recruit, brief, supervise and perform regular evaluations of freelancers</li>
          <li>Effectively ensuring Project and logistics management</li>
          <li>Conduct back-checks and address errors in questionnaires and other logical checks</li>
          <li>Contribute to the monthly activities report (MIS) & Monitor the daily status of interviews from interviewers, recruiters</li>
          <li>Ensuring timely Query Resolution</li>
          <li>Managing team within given time, cost and quality constraints</li>
          <li>Training all the supervisors in all projects at the initial stage for a better understanding of the project</li>
          <li>Responsible for Field level data quality checks, Monitoring the progress of fieldwork completion</li>
          <li>Checking Questionnaire and ensure that all the questions are properly filled</li>
          <li>Maintaining the process of backchecking and accompaniments and ensuring updating of the project file on a daily basis</li>
          <li>Responsible for the overall field-level data collection timeline</li>
        </ul>
        <h4>Key Work Highlights</h4>
        <p>
          Tsunami rehabilitations project in Kanyakumari, Tamil Nādu (American Red Cross, CARE India). Rapid Survey on Children (UNICEF), UNDP Indradhanush, Swachh Bharat Mission (PAF), NICE 3 – National Immunization Coverage Evaluation, WHO Measles Rubella Vaccination Campaign, ORBIS KAP Survey, TNHSP, TANSAC, and studies in Kerala. Issue of Photo identity cards to Handloom weavers (Ministry of Handloom and Textiles), Child labor study (CGG), World Bank Moving out of poverty, COSMIC listing (24000 households), MAGNUM study (61389 households across India). Experience in Kerala on AHS-CAB, ORGI, and multiple health and livelihood projects.
        </p>
        <h4>Language Proficiency</h4>
        <ul>
          <li>Tamil</li>
          <li>English</li>
          <li>Malayalam</li>
        </ul>
      </>
    ),
  },
  {
    id: 'member4',
    name: 'Team Member 4',
    profession: 'Profile coming soon',
    shortDescription: 'Full profile will be added soon.',
    expertise: [],
    fullProfile: <p>Full profile will be added soon.</p>,
  },
]
