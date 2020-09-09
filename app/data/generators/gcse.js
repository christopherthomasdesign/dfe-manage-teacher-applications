const weighted = require('weighted')
const gcseData = require('../gcse')

module.exports = (faker, isInternationCandidate) => {
  let year = faker.date.between('1970', '2016')
  year = year.getFullYear()

  // GCSEs were only awarded from 1988 onwards
  const type = (year <= 1988) ? 'O level' : weighted.select({
    GCSE: 0.9,
    'Scottish National 5': 0.1
  })

  // GCSE grade values changed to numbers after 2017
  const singleGrades = (type === 'GCSE' && year >= 2017) ? gcseData().singleGrades2017 : gcseData().singleGrades
  const doubleGrades = (type === 'GCSE' && year >= 2017) ? gcseData().doubleGrades2017 : gcseData().doubleGrades

  // Available grades
  const selectedMathsGrade = [{
    grade: faker.helpers.randomize(singleGrades)
  }]

  const scienceGrades = {
    singleAwardScience: [{
      exam: 'Single award',
      grade: faker.helpers.randomize(singleGrades)
    }],
    doubleAwardScience: [{
      exam: 'Double award',
      grade: faker.helpers.randomize(doubleGrades)
    }],
    tripleAwardScience: [{
      exam: 'Biology',
      grade: faker.helpers.randomize(singleGrades)
    }, {
      exam: 'Chemistry',
      grade: faker.helpers.randomize(singleGrades)
    }, {
      exam: 'Physics',
      grade: faker.helpers.randomize(singleGrades)
    }]
  }
  const selectedScienceGrade = weighted.select({
    singleAwardScience: 0.2,
    doubleAwardScience: 0.6,
    tripleAwardScience: 0.2
  })

  const englishGrades = {
    singleAwardEnglish: [{
      exam: 'English Language',
      grade: faker.helpers.randomize(singleGrades)
    }],
    doubleAwardEnglish: [{
      exam: 'English',
      grade: faker.helpers.randomize(doubleGrades)
    }],
    separateEnglish1: [{
      exam: 'English Language',
      grade: faker.helpers.randomize(singleGrades)
    }, {
      exam: 'English Literature',
      grade: faker.helpers.randomize(singleGrades)
    }],
    separateEnglish2: [{
      exam: 'English Language',
      grade: faker.helpers.randomize(singleGrades)
    }, {
      exam: 'English Studies',
      grade: faker.helpers.randomize(singleGrades)
    }]
  }
  const selectedEnglishGrade = weighted.select({
    singleAwardEnglish: 0.3,
    doubleAwardEnglish: 0.3,
    separateEnglish1: 0.2,
    separateEnglish2: 0.2
  })

  if (isInternationCandidate) {
    return {
      maths: {
        type: 'Baccalauréat Général',
        subject: 'Maths',
        country: 'France',
        missing: weighted.select({
          'I will be taking an equivalency test on 18th August 2020': 0.2,
          false: 0.8
        }),
        naric: {
          reference: '4000228363',
          comparable: 'GCSE grades A*-C/9-4'
        },
        grade: [{
          grade: faker.random.number({ min: 10, max: 20 })
        }],
        year
      },
      english: {
        type: 'Baccalauréat Général',
        subject: 'English',
        country: 'France',
        missing: weighted.select({
          'I will be taking an equivalency test on 18th August 2020': 0.2,
          false: 0.8
        }),
        naric: {
          reference: '4000228363',
          comparable: 'GCSE (grades A*-C / 9-4)'
        },
        grade: [{
          grade: faker.random.number({ min: 10, max: 20 })
        }],
        year
      },
      science: {
        type: 'Baccalauréat Général',
        subject: 'Science',
        country: 'France',
        missing: weighted.select({
          'I will be taking an equivalency test on 18th August 2020': 0.2,
          false: 0.8
        }),
        naric: {
          reference: '4000228363',
          comparable: 'GCSE (grades A*-C / 9-4)'
        },
        grade: [{
          grade: faker.random.number({ min: 10, max: 20 })
        }],
        year
      }
    }
  } else {
    return {
      maths: {
        type,
        subject: 'Maths',
        country: 'United Kingdom',
        missing: weighted.select({
          'I will be taking a maths equivalency test on 18th August 2020': 0.2,
          false: 0.8
        }),
        grade: selectedMathsGrade,
        year
      },
      english: {
        type,
        subject: 'English',
        country: 'United Kingdom',
        missing: weighted.select({
          'I will be taking an English equivalency test on 18th August 2020': 0.2,
          false: 0.8
        }),
        grade: englishGrades[selectedEnglishGrade],
        year
      },
      science: {
        type,
        subject: 'Science',
        country: 'United Kingdom',
        missing: weighted.select({
          'I will be taking a science equivalency test on 18th August 2020': 0.2,
          false: 0.8
        }),
        grade: scienceGrades[selectedScienceGrade],
        year
      }
    }
  }
}
