// src/data/questions.js
export const questionsBySection = [
  {
    title: "Pollution level",
    questions: [
      { id: 1, text: "The Degree of Soil Contamination (Point1 : No contaminantion, Point3 : At least one substance exceeds the national \"CONCERN LEVEL\" , Point5 : At least one substance exceeds the nationaL \"ACTION LEVE\"  )" },
      { id: 2, text: "The Degree of Water Contamination (Point1 : Class1, Point2 : Class2, Point3 : Class3, Point4 : Class4, Point5 : Class5 or presence of heavy matal contamination )" },
      { id: 3, text: "Area of Exposed Spoil Heaps ( Point1 : Less than 50,000m², Point2 : Between 50,000㎡ and 100,000㎡, Point3 : Between 100,000㎡ and 150,000㎡, Point4 : Between 150,000㎡ and 200,000㎡, Point5 : More than 200,000㎡ )" },
      { id: 4, text: "Health Impacts on Residents (Point1 : No reported health impacts related to the mine, Point3 : Multiple reports of respiratory, skin, or similar symptoms, Point5 : Widespread health issues officially reported by local clinics, health centers, or the media)" },
    ],
  },
  {
    title: "Usability",
    questions: [
      { id: 5, text: "Slope Gradient (Point1 : Steeper than 30°, Point2 : Between 20° and 30°, Point3 : Between 10° and 20°, Point4 : Between 5° and 10°, Point5 : Between 0° and 5°)" },
      { id: 6, text: "Elevation Above Sea Level (Point1 : Over 1000m, Point2 : Between 700m and 1000m, Point3 : Between 500m and 700m, Point4 : Between 200m and 500m, Point5 : Less than 200m)" },
      { id: 7, text: "Total Site Area (Point1 : Less than 10,000m², Point2 : Between 10,000m² and 50,000m², Point3 : Between 50,000m² and 200,000m², Point4 : Between 200,000m² and 500,000m², Point5 : More than 500,000m²)" },
      { id: 8, text: "Possibility of Subsidence (Point1 : Very Low, Point2 : Low, Point3 : Moderate, Point4 : High, Point5 : Very High)" },
    ],
  },
  {
    title: "Cultural & Historical Value",
    questions: [
      { id: 9, text: "Years of Operation (Point1 : Less than 20 years, Point2 : 20 ~ 40 years, Point3 : 40 ~ 60 years, Point4 : 60 ~ 80 years, Point5 : Over 80 years)" },
      { id: 10, text: "Preservation of Structures (Point1 : No remaining structures, Point2 : Most buildings collapsed, Point3 : Only partial remnants remain, Point4 : Partially preserved, structurally restorable, Point5 : Major structures retain original form)" },
      { id: 11, text: "Tourism Potential (Point1 : Not true at all, Point3 : Neutral, Point5 : Very true)" },
      { id: 12, text: "Collective Memory Among Residents (Point1 : Strongly disagree, Point2 : Disagree, Point3 : Neutral, Point4 : Agree, Point5 : Strongly agree)" },
    ],
  },
  {
    title: "Accessibility",
    questions: [
      { id: 13, text: "Distance from Major City (Point1 : More than 2 hours from the nearest major city, Point2 : 1.5 to 2 hours, Point3 : 1 to 1.5 hours, Point4 : 30 minutes to 1 hour, Point5 : Less than 30 minutes)" },
      { id: 14, text: "Public Transit Accessibility (Point1 : Strongly disagree, Point2 : Disagree, Point3 : Neutral, Point4 : Agree, Point5 : Strongly agree)" },
      { id: 15, text: "Vehicular Accessibility (Point1 : No vehicular access near the site, Point2 : Accessible only by unpaved forestry or maintenance roads (non-public use), Point3 : Only unpaved local roads available, Point4 : Access via paved roads, Point5 : Direct access from highways or national roads)" },
      { id: 16, text: "On-site Facility Availability (Point1 : Strongly disagree, Point2 : Disagree, Point3 : Neutral, Point4 : Agree, Point5 : Strongly agree)" },
    ],
  },
  {
    title: "Mining Dependency",
    questions: [
      { id: 17, text: "Population Change Rate (Point1 : Population increased, Point2 : Decrease between 0% and 10%, Point3 : Decrease between 11% and 30%, Point4 : Decrease between 31% and 50%, Point5 : Very High)" },
      { id: 18, text: "Local Unemployment Rate (Point1 : Less than 0.1%, Point2 : 0.1% to 0.5%, Point3 : 0.5% to 2%, Point4 : 2% to 5%, Point5 : Over 5%)" },
      { id: 19, text: "Economic Dependency on Mining (Point1 : Not at all – negligible impact (dominated by other industries), Point2 : Low – mining played a minor or supplementary role in the economy, Point3 : Moderate – one of several economic sectors, Point4 : High – one of the main industries, Point5 : Very high – mining served as the primary economic driver in the region)" },
      { id: 20, text: "Average Annual Coal Production (Point1 : Less than 150,000 tons, Point2 : 150,000 ~ 300,000 tons, Point3 : 300,000 ~ 450,000 tons, Point4 : 450,000 ~ 600,000 tons, Point5 : Over 600,000 tons)" },
    ],
  },
  {
    title: "Community Participation Potential",
    questions: [
      { id: 21, text: "Community Demand for Site Redevelopment (Point1 : Strongly disagree, Point2 : Disagree, Point3 : Neutral, Point4 : Agree, Point5 : Strongly agree)" },
      { id: 22, text: "Estimated Beneficiary Population (Point1 : Fewer than 1,000 people, Point2 : 1,001 ~ 5,000 people, Point3 : 5,001 ~ 10,000 people, Point4 : 10,001 ~ 30,000 people, Point5 : More than 30,000 people)" },
      { id: 23, text: "Walking Accessibility (Point1 : More than 30 min on foot, Point2 : 30 ~ 45 min, Point3 : 15 ~ 30 min, Point4 : 5 ~ 15 min, Point5 : Within 5 min)" },
      { id: 24, text: "Green Space per Capita (m²) (Point1 : Over 20m²/person, Point2 : 15 ~ 20m²/person, Point3 : 10 ~ 15m²/person, Point4 : 5 ~ 10m²/person, Point5 : Less than 5m²/person)" },
    ],
  },
];