import { Career, Course } from '../types';

export const MOCK_CAREERS: Career[] = [
  {
    id: 'ai-ethics-officer',
    title: 'AI Ethics & Governance Officer',
    industry: 'Artificial Intelligence',
    salaryRange: '$140,000 - $210,000',
    growthRate: '+38% (2026-2035)',
    demandScore: 95,
    educationRequired: 'Master’s in AI Ethics, Law, or Philosophy',
    description: 'Ensures artificial intelligence systems are developed and deployed responsibly, equitably, and transparently, mitigating algorithmic bias and safeguarding user privacy.',
    keySkills: ['Algorithmic Auditing', 'Regulatory Compliance (EU AI Act)', 'Moral Philosophy', 'Data Governance', 'Risk Management'],
    dailyTasks: [
      'Audit machine learning models for demographic bias',
      'Formulate organizational AI safety policies',
      'Collaborate with legal and engineering teams on compliance',
      'Evaluate third-party training data provenance'
    ],
    topCourses: ['c-ai-ethics', 'c-data-gov'],
    iconName: 'ShieldAlert',
    futureOutlook: 'Explosive growth as enterprise AI adoption requires strict governance and regulatory accountability.'
  },
  {
    id: 'quantum-ml-engineer',
    title: 'Quantum Machine Learning Engineer',
    industry: 'Quantum Computing',
    salaryRange: '$170,000 - $260,000',
    growthRate: '+45% (2026-2035)',
    demandScore: 92,
    educationRequired: 'Ph.D. or Master’s in Physics, Computer Science, or Quantum Information',
    description: 'Designs hybrid quantum-classical algorithms to solve complex optimization, cryptography, and drug discovery problems beyond the reach of classical supercomputers.',
    keySkills: ['Qiskit / Cirq', 'Quantum Algorithms', 'Linear Algebra', 'Python / C++', 'Machine Learning Theory'],
    dailyTasks: [
      'Write variational quantum eigensolver (VQE) algorithms',
      'Optimize tensor network simulations on quantum simulators',
      'Collaborate with quantum hardware physicists',
      'Benchmark quantum speedups against classical baselines'
    ],
    topCourses: ['c-quantum-intro'],
    iconName: 'Cpu',
    futureOutlook: 'Pioneering frontier technology with massive breakthroughs expected in materials science and finance.'
  },
  {
    id: 'climate-tech-architect',
    title: 'Climate Tech Systems Architect',
    industry: 'Green Energy & Sustainability',
    salaryRange: '$130,000 - $195,000',
    growthRate: '+40% (2026-2035)',
    demandScore: 94,
    educationRequired: 'Bachelor’s / Master’s in Environmental Engineering or Systems Engineering',
    description: 'Builds smart-grid infrastructure, carbon capture tracking systems, and decentralized renewable energy distribution networks using IoT and AI.',
    keySkills: ['IoT Sensors', 'Smart Grid Design', 'Carbon Accounting', 'Renewable Energy Systems', 'Data Analytics'],
    dailyTasks: [
      'Design IoT sensor networks for real-time grid load balancing',
      'Analyze emissions lifecycle data across supply chains',
      'Simulate solar and wind energy storage efficiency',
      'Consult with municipal governments on urban decarbonization'
    ],
    topCourses: ['c-climate-iot'],
    iconName: 'Leaf',
    futureOutlook: 'Critical global demand as governments and Fortune 500 companies race toward net-zero targets.'
  },
  {
    id: 'neural-interface-designer',
    title: 'Neural Interface UI/UX Designer',
    industry: 'Neurotechnology',
    salaryRange: '$150,000 - $220,000',
    growthRate: '+50% (2026-2035)',
    demandScore: 90,
    educationRequired: 'Master’s in Human-Computer Interaction, Neuroscience, or Cognitive Science',
    description: 'Crafts seamless thought-controlled interaction paradigms for brain-computer interfaces (BCIs), augmented reality headsets, and sensory substitution devices.',
    keySkills: ['EEG Signal Interpretation', 'HCI Principles', 'Spatial UI Design', 'Neurophysiology', 'Prototyping Tools'],
    dailyTasks: [
      'Map neural intent signals to digital UI actions',
      'Design low-latency visual and haptic feedback loops',
      'Conduct user testing with neuro-prosthetic prototypes',
      'Minimize cognitive fatigue in immersive BCI sessions'
    ],
    topCourses: ['c-bci-design'],
    iconName: 'Brain',
    futureOutlook: 'Revolutionizing human productivity, healthcare rehabilitation, and immersive computing.'
  },
  {
    id: 'synthetic-biology-tech',
    title: 'Synthetic Biology Technologist',
    industry: 'Biotechnology',
    salaryRange: '$135,000 - $190,000',
    growthRate: '+35% (2026-2035)',
    demandScore: 88,
    educationRequired: 'Master’s in Bioengineering, Genetics, or Synthetic Biology',
    description: 'Engineers artificial biological pathways and organisms to produce sustainable bioplastics, carbon-negative fuels, and customized therapeutics.',
    keySkills: ['CRISPR Tools', 'DNA Synthesis Software', 'Bioinformatics', 'Metabolic Engineering', 'Lab Automation'],
    dailyTasks: [
      'Design synthetic gene circuits using CAD software',
      'Program robotic liquid-handling systems for high-throughput screening',
      'Analyze sequencing data for protein expression optimization',
      'Ensure biosafety and containment protocols'
    ],
    topCourses: ['c-synbio-basics'],
    iconName: 'Dna',
    futureOutlook: 'Transforming manufacturing, medicine, and agriculture through programmable biology.'
  },
  {
    id: 'space-habitat-engineer',
    title: 'Space Habitat Systems Engineer',
    industry: 'Space Exploration',
    salaryRange: '$160,000 - $240,000',
    growthRate: '+32% (2026-2035)',
    demandScore: 86,
    educationRequired: 'Master’s in Aerospace Engineering or Mechanical Systems',
    description: 'Designs life-support ecosystems, radiation shielding, and autonomous construction modules for lunar and Martian permanent settlements.',
    keySkills: ['Closed-Loop Life Support', 'Radiation Physics', 'Robotic Assembly', 'Thermal Control', 'CAD / CAE'],
    dailyTasks: [
      'Simulate atmospheric regeneration efficiency in hydroponic bays',
      'Test regolith-based 3D printing structural stress',
      'Design redundant power microgrids for deep-space outposts',
      'Coordinate multi-agency aerospace payloads'
    ],
    topCourses: ['c-space-systems'],
    iconName: 'Rocket',
    futureOutlook: 'Entering a golden age of commercial space stations and interplanetary colonization.'
  },
  {
    id: 'immersive-learning-lead',
    title: 'EdTech Immersive Learning Lead',
    industry: 'Educational Technology',
    salaryRange: '$120,000 - $175,000',
    growthRate: '+42% (2026-2035)',
    demandScore: 93,
    educationRequired: 'Bachelor’s / Master’s in Educational Technology, HCI, or Game Design',
    description: 'Creates virtual reality (VR) laboratories, holographic medical training simulations, and adaptive gamified curricula that redefine global education.',
    keySkills: ['Unity / Unreal Engine', 'Pedagogical Design', 'Spatial Audio/Visuals', 'Learning Analytics', 'UX Research'],
    dailyTasks: [
      'Design interactive 3D particle physics simulations for high schools',
      'Analyze student engagement telemetry in VR modules',
      'Collaborate with neuro-educators on cognitive retention models',
      'Manage multi-platform immersive curriculum deployments'
    ],
    topCourses: ['c-edtech-vr', 'c-ai-pedagogy'],
    iconName: 'GraduationCap',
    futureOutlook: 'Expansive transition toward experiential, remote, and lifelong immersive learning.'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c-ai-ethics',
    title: 'Applied AI Ethics & Algorithmic Auditing',
    category: 'Artificial Intelligence',
    duration: '6 Weeks',
    level: 'Intermediate',
    rating: 4.9,
    studentsEnrolled: 14250,
    instructor: 'Dr. Elena Rostova',
    description: 'Master practical tools for auditing neural networks, detecting data bias, and implementing ISO-standard AI governance in enterprise organizations.',
    skillsGained: ['Bias Detection', 'Fairness Metrics', 'EU AI Compliance', 'Ethics Frameworks'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-quantum-intro',
    title: 'Quantum Computing Foundations & Qiskit',
    category: 'Quantum Computing',
    duration: '10 Weeks',
    level: 'Advanced',
    rating: 4.8,
    studentsEnrolled: 8900,
    instructor: 'Prof. Marcus Vance',
    description: 'Dive into superposition, entanglement, quantum gates, and build your first quantum circuits on real IBM hardware via Qiskit.',
    skillsGained: ['Qiskit', 'Quantum Circuits', 'Linear Algebra', 'Shor’s Algorithm'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-climate-iot',
    title: 'IoT & Smart Grid Architectures for Decarbonization',
    category: 'Green Energy',
    duration: '8 Weeks',
    level: 'Intermediate',
    rating: 4.9,
    studentsEnrolled: 11200,
    instructor: 'Sarah Jenkins, P.E.',
    description: 'Learn to design low-power IoT sensor networks, renewable energy storage algorithms, and real-time smart grid telemetry systems.',
    skillsGained: ['IoT Protocols', 'Energy Balancing', 'Carbon Tracking', 'Edge Computing'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-bci-design',
    title: 'Brain-Computer Interfaces & Spatial UI',
    category: 'Neurotechnology',
    duration: '12 Weeks',
    level: 'Advanced',
    rating: 4.7,
    studentsEnrolled: 6400,
    instructor: 'Dr. Kenji Sato',
    description: 'Explore the intersection of neuroscience and human-computer interaction. Decode EEG signals and build hands-free immersive user interfaces.',
    skillsGained: ['EEG Processing', 'Spatial Design', 'Cognitive Load Analysis', 'BCI Hardware'],
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-edtech-vr',
    title: 'Immersive VR Curriculum Design for Education',
    category: 'Educational Technology',
    duration: '6 Weeks',
    level: 'Beginner',
    rating: 4.9,
    studentsEnrolled: 21500,
    instructor: 'Amara Okafor',
    description: 'Design captivating virtual reality science labs and history simulations using Unity and pedagogical engagement frameworks.',
    skillsGained: ['Unity 3D', 'Pedagogy', 'Interactive Storytelling', 'Accessibility in VR'],
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c-synbio-basics',
    title: 'Synthetic Biology & Genetic Circuit Design',
    category: 'Biotechnology',
    duration: '8 Weeks',
    level: 'Intermediate',
    rating: 4.8,
    studentsEnrolled: 9300,
    instructor: 'Dr. Lucas Thorne',
    description: 'Program biological cells like computers. Learn DNA assembly standards, genetic logic gates, and metabolic pathway engineering.',
    skillsGained: ['CRISPR Mechanics', 'BioCAD', 'Gene Circuits', 'Lab Automation'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What type of problems energize you the most?',
    options: [
      { label: 'Ensuring fairness, safety, and ethical standards in emerging technologies', category: 'Artificial Intelligence' },
      { label: 'Solving deep mathematical and physics equations for ultra-fast computing', category: 'Quantum Computing' },
      { label: 'Building sustainable physical infrastructure and clean energy solutions', category: 'Green Energy' },
      { label: 'Exploring how the human brain and consciousness interface with computers', category: 'Neurotechnology' },
      { label: 'Programming biological systems and engineering living organisms', category: 'Biotechnology' },
      { label: 'Designing interactive virtual worlds and next-gen educational experiences', category: 'Educational Technology' }
    ]
  },
  {
    id: 2,
    question: 'Which work environment do you thrive in?',
    options: [
      { label: 'Policy rooms, tech governance councils, and cross-disciplinary research labs', category: 'Artificial Intelligence' },
      { label: 'Advanced cryogenic research facilities and theoretical simulation clusters', category: 'Quantum Computing' },
      { label: 'Field sites, solar farms, smart-city control centers, and IoT networks', category: 'Green Energy' },
      { label: 'Neuroscience clinics, BCI hardware prototyping shops, and HCI labs', category: 'Neurotechnology' },
      { label: 'Wet labs with robotic liquid handlers and gene-sequencing equipment', category: 'Biotechnology' },
      { label: 'Creative studios building 3D spatial simulations, VR labs, and learning tools', category: 'Educational Technology' }
    ]
  },
  {
    id: 3,
    question: 'What is your preferred core academic background or strength?',
    options: [
      { label: 'Law, Ethics, Sociology, or Computer Science', category: 'Artificial Intelligence' },
      { label: 'Quantum Physics, Advanced Mathematics, or Theoretical Physics', category: 'Quantum Computing' },
      { label: 'Environmental Engineering, Electrical Engineering, or Systems Science', category: 'Green Energy' },
      { label: 'Cognitive Science, Neuroscience, or Human-Computer Interaction', category: 'Neurotechnology' },
      { label: 'Genetics, Biochemistry, or Bioengineering', category: 'Biotechnology' },
      { label: 'Education, Game Design, Psychology, or Interactive Media', category: 'Educational Technology' }
    ]
  }
];
