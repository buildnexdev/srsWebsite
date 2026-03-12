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
    id: 'soban-prabhu',
    name: 'Mrs. Soban Prabhu',
    profession: 'Proprietor',
    shortDescription: 'Founded Smart Research Solution in 2017. Nearly 18 years in the research sector—from Field Investigator to State-Level Coordinator. Focus on data accuracy, quality control, and client satisfaction.',
    expertise: ['Field Research', 'Team Leadership', 'Quality Control', 'Client Relations'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          My career in the research industry began in 2007 when, as a postgraduate, I undertook my first field survey in Udumalpet, located in the Coimbatore district of Tamil Nadu. From the very beginning, I approached field research with dedication, discipline, and a strong commitment to achieving project objectives.
        </p>
        <p>
          Over the years, I worked extensively as a Field Investigator across all districts of Tamil Nadu, gaining comprehensive grassroots experience and deep regional exposure. My consistent focus on data accuracy, quality control, and timely execution earned appreciation directly from clients and stakeholders.
        </p>
        <p>
          Recognizing my performance and leadership abilities, I was promoted to Field Supervisor. Through effective team coordination, operational planning, and strict adherence to research standards, I further progressed to the roles of Zonal Coordinator and State-Level Coordinator. These positions allowed me to manage larger teams, oversee complex assignments, and ensure high-quality data delivery across multiple regions.
        </p>
        <p>
          After nearly a decade of hands-on experience and professional growth, I established <strong>Smart Research Solution</strong> in 2017. This venture was founded on strong field expertise, ethical research practices, and a commitment to delivering reliable and actionable insights. The organization was built with the support of a skilled and dedicated team, reflecting the collective experience gained over years of field operations.
        </p>
        <p>
          With nearly 18 years of experience in the research sector, I have successfully handled a diverse range of projects and collaborated with numerous clients across India. I take pride in maintaining long-term professional relationships and consistently delivering high standards of quality, integrity, and client satisfaction.
        </p>
      </>
    ),
  },
  {
    id: 'elango',
    name: 'Mr. Elango',
    profession: 'Senior Consultant',
    shortDescription: 'Over 20 years in Market Research, Customized Research, and Social Research. Senior Executive – DA (Social) at Nielsen India Ltd. Expert in survey planning, field implementation, and regional monitoring across Tamil Nadu and Kerala.',
    expertise: ['Survey Design & Field Implementation', 'Large-Scale Project Execution', 'Regional Monitoring & QA', 'Training of Trainers (TOT)'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          A highly experienced research professional with more than 20 years of extensive experience in Market Research, Customized Research, and Social Research. Currently serving as Senior Executive – DA (Social) at Nielsen India Ltd., Coimbatore, with strong expertise in survey planning, technical execution, field implementation, and regional-level monitoring.
        </p>
        <p>
          Possessing in-depth knowledge of large-scale survey operations, field management systems, and quality control processes, with a proven track record of successfully managing multi-state assignments. Demonstrated ability to coordinate diverse field teams, conduct capacity-building programs, and ensure smooth implementation of complex research projects across Tamil Nadu and Kerala.
        </p>
        <p>
          A dedicated professional with strong organizational, leadership, and communication skills, capable of executing assignments independently while effectively collaborating within team environments.
        </p>
        <h4>Professional Experience</h4>
        <div className="profile-experience-table" role="table" aria-label="Professional experience">
          <div className="profile-experience-thead" role="rowgroup">
            <div className="profile-experience-row profile-experience-header" role="row">
              <div className="profile-experience-cell" role="columnheader">Period</div>
              <div className="profile-experience-cell" role="columnheader">Employing organization and your title/position</div>
              <div className="profile-experience-cell" role="columnheader">Country</div>
              <div className="profile-experience-cell" role="columnheader">Summary of activities performed relevant to the Assignment</div>
            </div>
          </div>
          <div className="profile-experience-tbody" role="rowgroup">
            <div className="profile-experience-row" role="row">
              <div className="profile-experience-cell" role="cell">From 1994 till date</div>
              <div className="profile-experience-cell" role="cell">Nielsen (India) Private Limited, Coimbatore. Sr. Field Executive</div>
              <div className="profile-experience-cell" role="cell">India</div>
              <div className="profile-experience-cell profile-experience-summary" role="cell">
                R Elango is working as a Sr DA Executive and has experience of over 25 years in issues related to social research. He has experience in <strong>rural development, livelihood, rehabilitation, health, water sanitation Program, and communication</strong> etc. He has developed specialized skills in conducting In-depth Discussions, Focus Group Discussions. He has good experience of organizing &amp; imparting pieces of training on various social issues in the states of Tamil Nadu and Kerala. Also, he has an experience of co-ordinating social surveys on a large scale, field-level data quality checks, monitoring the progress of fieldwork completion, also coordinating with data entry centres. He has a holistic understanding of the social sector research, having field co-ordinating <strong>multiple sectors — including rural development and poverty alleviation, livelihoods, education, maternal and child health and nutrition, governance, water and sanitation</strong>, etc.
              </div>
            </div>
            <div className="profile-experience-row" role="row">
              <div className="profile-experience-cell" role="cell">From 1993–1994</div>
              <div className="profile-experience-cell" role="cell">Department of Anthropology, University of Madras, Madras. Field co-ordinator</div>
              <div className="profile-experience-cell" role="cell">India</div>
              <div className="profile-experience-cell profile-experience-summary" role="cell">Field coordination and survey execution for the Smithsonian/University of Madras research project on the elderly in India.</div>
            </div>
            <div className="profile-experience-row" role="row">
              <div className="profile-experience-cell" role="cell">From 1992–1993</div>
              <div className="profile-experience-cell" role="cell">Ministry of Health and Family Welfare — NFHS 2 Field co-ordinator for Tamil Nadu, Kerala and Bihar</div>
              <div className="profile-experience-cell" role="cell">India</div>
              <div className="profile-experience-cell profile-experience-summary" role="cell">Large-scale survey coordination and field supervision for NFHS 2 across three states.</div>
            </div>
          </div>
        </div>
        <h4>Key Responsibilities and Contributions</h4>
        <div className="profile-responsibilities-table" role="table" aria-label="Key responsibilities">
          <div className="profile-responsibilities-row" role="row">
            <div className="profile-responsibilities-num" role="cell">1</div>
            <div className="profile-responsibilities-cell" role="cell">
              <strong>Survey Planning and Technical Implementation</strong>
              <ul>
                <li>Extensive involvement in the technical aspects of survey design and execution</li>
                <li>Planning and implementing field methodologies tailored to project requirements</li>
                <li>Ensuring adherence to research protocols and quality standards</li>
                <li>Supervising field data collection processes and troubleshooting operational challenges</li>
              </ul>
            </div>
          </div>
          <div className="profile-responsibilities-row" role="row">
            <div className="profile-responsibilities-num" role="cell">2</div>
            <div className="profile-responsibilities-cell" role="cell">
              <strong>Large-Scale Survey Management</strong>
              <ul>
                <li>Associated with numerous large-scale national and regional studies over the past 20 years</li>
                <li>Coordinated multi-location survey operations ensuring timelines and quality benchmarks were met</li>
                <li>Maintained high standards of data accuracy, validation, and reporting</li>
              </ul>
            </div>
          </div>
          <div className="profile-responsibilities-row" role="row">
            <div className="profile-responsibilities-num" role="cell">3</div>
            <div className="profile-responsibilities-cell" role="cell">
              <strong>Regional Monitoring &amp; Team Coordination</strong>
              <ul>
                <li>Currently responsible for monitoring and supervising field activities at the regional level in Tamil Nadu and Kerala</li>
                <li>Leading and coordinating field teams, supervisors, and investigators</li>
                <li>Conducting regular field visits to ensure compliance with project guidelines</li>
                <li>Reviewing progress reports and implementing corrective measures when required</li>
              </ul>
            </div>
          </div>
          <div className="profile-responsibilities-row" role="row">
            <div className="profile-responsibilities-num" role="cell">4</div>
            <div className="profile-responsibilities-cell" role="cell">
              <strong>Training &amp; Capacity Building</strong>
              <ul>
                <li>Conducting Training of Trainers (TOT) programs</li>
                <li>Acting as Core Trainer for field investigators and supervisory staff</li>
                <li>Facilitating training workshops focused on survey methodology, ethical practices, and field management</li>
                <li>Providing ongoing mentoring and performance feedback to team members</li>
              </ul>
            </div>
          </div>
          <div className="profile-responsibilities-row" role="row">
            <div className="profile-responsibilities-num" role="cell">5</div>
            <div className="profile-responsibilities-cell" role="cell">
              <strong>Travel &amp; Project Coordination</strong>
              <ul>
                <li>Extensive travel across India for: project coordination, field supervision, staff training, workshops and professional seminars</li>
                <li>Successfully managed diverse geographical assignments with cultural sensitivity and adaptability</li>
              </ul>
            </div>
          </div>
        </div>
        <h4>Core Competencies</h4>
        <ul>
          <li>Survey Design and Field Implementation</li>
          <li>Large-Scale Project Execution</li>
          <li>Regional Monitoring and Quality Assurance</li>
          <li>Team Leadership and Coordination</li>
          <li>Training of Trainers (TOT)</li>
          <li>Communication and Facilitation Skills</li>
          <li>Independent Assignment Handling</li>
          <li>Multi-State Field Operations</li>
          <li>Adaptability and Problem-Solving</li>
        </ul>
        <h4>Special Skills</h4>
        <p><strong>Training &amp; Facilitation:</strong> Certified/Experienced in TOT; strong presentation and facilitation skills; ability to communicate complex survey procedures clearly to field teams.</p>
        <p><strong>Team Building &amp; Leadership:</strong> Effective team coordination and supervision; capable of executing assignments independently and within team structures; adaptable, amicable, and result-oriented.</p>
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
    id: 'maria',
    name: 'Maria Jacquilin Mary',
    profession: 'Researcher',
    shortDescription: 'Content writer, Project Manager (AMR), Technical Assistant at ICMR during COVID. Field surveillance in 12 districts (SARI, ILI, AFI). NCAER Field Supervisor—Women’s Empowerment and Youth (Orange Economy) studies.',
    expertise: ['Infectious Disease Surveillance', 'Field Epidemiology', 'Data Analysis (Epi Info, SPSS)', 'Protocol Writing'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          The career started with Content Writer with several projects. Also worked as a Project Manager in a Public Health Institution on a USA-based Anti-Microbial Resistance (AMR) program in select districts in Tamil Nadu. During COVID, joined as Technical Assistant in ICMR (Indian Council of Medical Research), with field surveillance evaluation in 12 districts of Tamil Nadu in PHCs (Primary Health Centres)—research on SARI (Severe Acute Respiratory Infection), ILI (Influenza-Like Illness), and AFI (Acute Febrile Illness). Participated in COVID outbreak investigation in Vellore (Paiyur refugee camp). Advanced data analysis using Epi Info and SPSS; writing protocols for field surveys. Also worked as Field Supervisor on NCAER’s Women’s Empowerment study in Tamil Nadu and Kerala, and Youth survey (Orange Economy study) in Tamil Nadu.
        </p>
        <h4>Early Career – Research &amp; Content Development</h4>
        <p>
          Began as a Content Writer, contributing to multiple research-based and technical writing projects. This role strengthened the ability to interpret scientific information, develop structured documentation, and communicate complex concepts clearly—laying the foundation for public health documentation, protocol development, and reporting.
        </p>
        <h4>Project Management – Anti-Microbial Resistance (AMR) Program</h4>
        <p>Served as Project Manager for a USA-based public health initiative on AMR, implemented across selected districts in Tamil Nadu.</p>
        <ul>
          <li>Coordinated with district-level stakeholders and healthcare facilities</li>
          <li>Supervised field-level implementation activities</li>
          <li>Supported monitoring and evaluation of AMR indicators</li>
          <li>Prepared technical reports and documentation</li>
          <li>Ensured alignment between field operations and project objectives</li>
        </ul>
        <h4>Technical Assistant – Indian Council of Medical Research (ICMR)</h4>
        <p>During COVID-19, contributed to large-scale infectious disease surveillance and field evaluation across Tamil Nadu.</p>
        <p><strong>Field Surveillance &amp; Research:</strong> Field surveillance evaluation across 12 districts (PHCs)—SARI, ILI, AFI—assessing case identification, reporting, and laboratory referral systems.</p>
        <p><strong>COVID-19 Outbreak Investigation – Vellore:</strong> Participated in outbreak investigation including Paiyur refugee camp—field data collection and validation, epidemiological line listing, contact tracing, situation assessment, and technical outbreak reports.</p>
        <h4>Technical &amp; Analytical Expertise</h4>
        <p>Advanced data analysis using Epi Info and SPSS: data cleaning and validation, descriptive and analytical statistics, report generation. Experience in writing research protocols, designing data collection tools, M&amp;E frameworks, and technical and policy-oriented reports.</p>
        <h4>Professional Strengths</h4>
        <ul>
          <li>Infectious Disease Surveillance</li>
          <li>Field Epidemiology</li>
          <li>Outbreak Investigation</li>
          <li>Public Health Program Management</li>
          <li>Advanced Data Analysis</li>
          <li>Scientific &amp; Technical Writing</li>
          <li>Stakeholder Coordination</li>
        </ul>
        <h4>Field Supervisor – NCAER</h4>
        <p><strong>Women’s Empowerment Study – Tamil Nadu &amp; Kerala:</strong> Supervised field investigators; quality control and data accuracy; monitored timelines; coordinated logistics and stakeholder communication; validated field-level data and reports.</p>
        <p><strong>Youth Survey – Orange Economic Study (Tamil Nadu):</strong> Supervised Youth Survey (NielsenIQ); managed enumerator teams; adherence to survey protocols; real-time data collection monitoring; field audits; preliminary data validation.</p>
        <h4>Language Proficiency</h4>
        <p>Tamil, English, and Malayalam.</p>
      </>
    ),
  },
  {
    id: 'uma',
    name: 'Mrs. Uma',
    profession: 'State Co-ordinator',
    shortDescription: 'Began as Data Entry Operator; first field survey with TNHPS. Specialized training at Emory University, USA. District Field Coordinator; manpower supply and field coordination across Tamil Nadu.',
    expertise: ['Large-Scale Field Operations', 'Manpower Supply', 'Team Coordination', 'Training'],
    fullProfile: (
      <>
        <h4>Professional Profile</h4>
        <p>
          Our State Co-Coordinator began her career as a Data Entry Operator in the Statistical Department at Tiruchirappalli. During her tenure, the Government launched the Tamil Nadu Household Panel Systems Project (TNHPS) survey in the district, where she conducted her very first field survey, marking the beginning of her journey in large-scale field operations.
        </p>
        <p>
          She later underwent specialized training at Emory University, USA, which equipped her with advanced skills to handle complex and large-scale surveys with expertise and precision. Her outstanding performance and unwavering dedication earned high appreciation from the client, leading to her promotion as District Field Coordinator.
        </p>
        <p>
          Over the years, she has trained numerous candidates at various levels and has actively contributed to multiple collaborative projects with clients. The quality, accuracy, and consistency of her work have consistently distinguished her as a dependable leader in the field.
        </p>
        <p>
          Across Tamil Nadu, she has successfully managed manpower supply operations, working closely with clients in every district to ensure effective coordination and enhanced project outcomes.
        </p>
        <p>
          Even today, she continues to lead from the front—coordinating teams, managing manpower supply, and conducting regular field visits to maintain excellence and uphold the highest standards in project execution.
        </p>
      </>
    ),
  },
]
