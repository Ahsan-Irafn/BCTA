const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped-courses', 'extracted-all.json')));

// Also let's get CPC50220 SA data
const saDiplomaUnits = [
  { code: 'BSBOPS504', title: 'Manage business risk', type: 'Core' },
  { code: 'BSBWHS513', title: 'Lead WHS risk management', type: 'Core' },
  { code: 'CPCCBC4001', title: 'Apply building codes and standards to the construction process for Class 1 and 10 buildings', type: 'Core' },
  { code: 'CPCCBC4003', title: 'Select, prepare and administer a construction contract', type: 'Core' },
  { code: 'CPCCBC4004', title: 'Identify and produce estimated costs for building and construction projects', type: 'Core' },
  { code: 'CPCCBC4005', title: 'Produce labour and material schedules for ordering', type: 'Core' },
  { code: 'CPCCBC4008', title: 'Supervise site communication and administration processes for building and construction projects', type: 'Core' },
  { code: 'CPCCBC4009', title: 'Apply legal requirements to building and construction projects', type: 'Core' },
  { code: 'CPCCBC4010', title: 'Apply structural principles to residential and commercial constructions', type: 'Core' },
  { code: 'CPCCBC4012', title: 'Read and interpret plans and specifications', type: 'Core' },
  { code: 'CPCCBC4013', title: 'Prepare and evaluate tender documentation', type: 'Core' },
  { code: 'CPCCBC4014', title: 'Prepare simple building sketches and drawings', type: 'Core' },
  { code: 'CPCCBC4018', title: 'Apply site surveys and set-out procedures to building and construction projects', type: 'Core' },
  { code: 'CPCCBC4053', title: 'Apply building codes and standards to the construction process for Class 2 to 9 Type C buildings', type: 'Core' },
  { code: 'CPCCBC5001', title: 'Apply building codes and standards to the construction process for Type B construction', type: 'Core' },
  { code: 'CPCCBC5002', title: 'Monitor costing systems on complex building and construction projects', type: 'Core' },
  { code: 'CPCCBC5003', title: 'Supervise the planning of on-site building and construction work', type: 'Core' },
  { code: 'CPCCBC5005', title: 'Select and manage building and construction contractors', type: 'Core' },
  { code: 'CPCCBC5007', title: 'Administer the legal obligations of a building and construction contractor', type: 'Core' },
  { code: 'CPCCBC5010', title: 'Manage construction work', type: 'Core' },
  { code: 'CPCCBC5011', title: 'Manage environmental management practices and processes in building and construction', type: 'Core' },
  { code: 'CPCCBC5013', title: 'Manage professional technical and legal reports on building and construction projects', type: 'Core' },
  { code: 'CPCCBC5018', title: 'Apply structural principles to the construction of buildings up to three storeys', type: 'Core' },
  { code: 'CPCCBC5019', title: 'Manage building and construction business finances', type: 'Core' },
  { code: 'BSBPMG532', title: 'Manage project quality', type: 'Elective' },
  { code: 'CPCCBC4052', title: 'Lead and manage teams in the building and construction industry', type: 'Elective' },
  { code: 'BSBPMG538', title: 'Manage project stakeholder engagement', type: 'Elective' }
];

console.log('Generating coursesData.ts with authentic data from all 6 qualifications...');
