const diagnosisSymptomCleaner = (uncleanedSymptomList) => {
  return new Promise((resolve, reject) => {
    let symptomList = [];
    uncleanedSymptomList.map((user) => {
      user.RegisteringSymptomData.map((symptom) => {
        let flag = true;
        symptomList.map((obj) => {
          obj.id === symptom.RegisteredSymptomData.id ? flag = false : null;
        });
        flag ?
          symptomList.push({"id": symptom.RegisteredSymptomData.id, "nameKr": symptom.RegisteredSymptomData.nameKr})
          : null;  
      });
    });
    return resolve(symptomList);
  });
};

module.exports = diagnosisSymptomCleaner;

/*
{
  "uncleanedSymptomList": [
    {
      "id": 1,
      "RegisteringDiagnosisData": [
        {
          "id": 2,
          "RegisteredDiagnosisData": {
            "id": 2
          }
        }
      ],
      "RegisteringSymptomData": [
        {
          "id": 1,
          "RegisteredSymptomData": {
            "nameKr": "우울한 기분"
          }
        },
        {
          "id": 2,
          "RegisteredSymptomData": {
            "nameKr": "식욕 저하"
          }
        }
      ]
    },
    {
      "id": 2,
      "RegisteringDiagnosisData": [
        {
          "id": 4,
          "RegisteredDiagnosisData": {
            "id": 2
          }
        }
      ],
      "RegisteringSymptomData": [
        {
          "id": 3,
          "RegisteredSymptomData": {
            "nameKr": "우울한 기분"
          }
        },
        {
          "id": 4,
          "RegisteredSymptomData": {
            "nameKr": "식욕 저하"
          }
        }
      ]
    }
  ]
}
*/