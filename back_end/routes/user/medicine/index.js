const { User, Medicine, MedicineData, MedicineEvaluationData, MedicineSideEffectsData, MedicinePurposeData, MedicineDosageData, Diagnosis, Symptom } = require('../../../models');

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const uncleanedMedicineData = await User.findOne({
      attributes: ['id'], where: { id },
      include: [{
        model: MedicineData, as: 'RegisteringMedicineData', attributes: ['id'],
        include: [{
            model: Medicine, as: 'RegisteredMedicineData', attributes: ['id', 'nameKr'],
            include: [
              {
                model: MedicinePurposeData, as: 'RegisteredMedicinePurposeData', attributes: ['id', 'perceivedEffectiveness'],
                include: [
                  { model: Diagnosis, as: 'UsedMedicineForDiagnosis', attributes: ['nameKr']},
                  { model: Symptom, as: 'UsedMedicineForSymptom', attributes: ['nameKr']},
                ]
              },
              { model: MedicineEvaluationData, as: 'RegisteredMedicineEvaluationData', attributes: ['sideEffects', 'fkMedicineId']},
              {
                model: MedicineSideEffectsData, as: 'RegisteredMedicineSideEffectsData', attributes: ['id'],
                include: [{ model: Symptom, as: 'SymptomOfSideEffects', attributes: ['nameKr']}]
              },
              {
                model: MedicineDosageData, as: 'RegisteredMedicineDosageData', attributes: [
                  'id',
                  'takingStatus',
                  'recentTakingYear', 'recentTakingMonth', 'recentTakingDay', 'dosageCount', 'dosageMg', 'dosageFrequency', 'additionalDosage',
                  'stopTakingYear', 'stopTakingMonth', 'stopTakingDay',
                ]
              }
            ]
        }]
      }]
    });

    const contents = uncleanedMedicineData.RegisteringMedicineData.map((obj) => {
      const { id } = obj;
      const contentId = obj.RegisteredMedicineData.id;  // medicineId
      const medicineName = obj.RegisteredMedicineData.nameKr;  // 이름 혹은 null

      /** 하나의 처방약이 여러 개의 처방 목적을 가질 수 있다. 따라서 DB 설계 상 MedicineData:MedicinePurposeData = 1:N
       * 그러나 mvp 기능상 하나의 처방 목적만 등록할 수 있도록 되어 있다. 그래서 데이터를 첫 번째 원소([0])로 특정한다.
       * 최종 설계에 따라 추후 여러 개의 처방 목적을 등록/조회할 수 있도록 한다.
       */
      const purposeData = obj.RegisteredMedicineData.RegisteredMedicinePurposeData[0];
      const purposeOfPrescription = purposeData.UsedMedicineForDiagnosis ?
        purposeData.UsedMedicineForDiagnosis.nameKr
        :
        purposeData.UsedMedicineForSymptom ?
          purposeData.UsedMedicineForSymptom.nameKr
          :
          '-';

      let perceivedEffect;
      switch (purposeData.perceivedEffectiveness) {
        case 1: perceivedEffect = '알 수 없다'; break;
        case 2: perceivedEffect = '없다'; break;
        case 3: perceivedEffect = '약간'; break;
        case 4: perceivedEffect = '보통'; break;
        case 5: perceivedEffect = '크다'; break;
        default: perceivedEffect = '-';
      }

      let degreeOfSideEffect;
      /** 하나의 처방약에 여러 개의 처방 목적이 있을 수 있음에 따라, 처방 목적에 대한 처방약의 평가도 여러 개가 있을 수 있다.
       * DB 설계 상 Medicine:MedicineEvaluationData = 1:N
       * 그러나 mvp 기능 상 하나의 처방 목적만 등록할 수 있게 제한함에 따라, 평가 역시 하나만 등록이 된다. 데이터를 배열의 첫 번째 원소([0])만 조회한다.
      */
      switch (obj.RegisteredMedicineData.RegisteredMedicineEvaluationData[0].sideEffects) {
        case 1: degreeOfSideEffect = '없다'; break;
        case 2: degreeOfSideEffect = '약간'; break;
        case 3: degreeOfSideEffect = '중간'; break;
        case 4: degreeOfSideEffect = '심각'; break;
        default: degreeOfSideEffect = '-';
      }
      
      const symptomOfSideEffect = obj.RegisteredMedicineData.RegisteredMedicineSideEffectsData ? 
        obj.RegisteredMedicineData.RegisteredMedicineSideEffectsData[0].SymptomOfSideEffects.nameKr + ' 등'
        :
        '-';

        let dosage = '';
        if (obj.RegisteredMedicineDosageData) {  // MedicineDosageData를 등록한 경우(용량 추가하기를 마친 경우)
          let { /** variables */ } = obj.RegisteredMedicineDosageData;
          switch (dosageFrequency) {
            case 1: dosageFrequency = '매일'; break; case 2: dosageFrequency = '매일 2회씩'; break; case 3: dosageFrequency = '매일 3회씩'; break; case 4: dosageFrequency = '매일 4회씩'; break; case 5: dosageFrequency = '매일 5회씩'; break;
            case 6: dosageFrequency = '이틀에 1회씩'; break; case 7: dosageFrequency = '매주'; break; case 8: dosageFrequency = '2주에 1회씩'; break; case 9: dosageFrequency = '3주에 1회씩'; break; case 10: dosageFrequency = '매월'; break;
            case 11: dosageFrequency = '6주에 1회씩'; break; case 12: dosageFrequency = '8주에 1회씩'; break; case 13: dosageFrequency = '3개월에 1회씩'; break; case 14: dosageFrequency = '12주에 1회씩'; break; case 15: dosageFrequency = '6개월에 1회씩'; break;
            case 16: dosageFrequency = '8개월에 1회씩'; break; case 17: dosageFrequency = '매년'; break; case 18: dosageFrequency = '딱 한 번'; break; case 19: dosageFrequency = '필요할 때마다'; break; default:
          }
  
          if (!takingStatus) {  // 현재 복용 중이지 않은 경우
            dosage += '(과거 복용 경험)';
          }
          dosage += + dosageMg + 'mg / ' + dosageCount + '정(알) / ' + dosageFrequency;
          if (additionalDosage) dosage += '(필요시 ' + additionalDosage + '정 추가 복용)';
          dosage += ' / ' + recentTakingYear + '년 ';
          if (recentTakingMonth) {
            dosage += recentTakingMonth + '월 ';
            if (recentTakingDay) dosage += recentTakingDay + '일 ~ ';
            else dosage += '~';
          } else dosage += '~';
          if (!takingStatus) {  // 현재 복용 중이지 않은 경우
            dosage += stopTakingYear + '년 ';
            if (stopTakingMonth) {
              dosage += stopTakingMonth + '월 ';
              if (stopTakingDay) dosage += stopTakingDay + '일 ~ ';
              else dosage += '~';
            } else dosage += '~';
          }
        } else dosage = '-';  // MedicineDosageData를 등록하지 않은 경우(용량 추가하기를 하지 않은 경우)

      return {
        id,  // 한 User에게 등록된 MedicineData의 id
        contentId,  // medicine의 id (-> ProfileContentList(Container))
        medicineName,
        purposeOfPrescription,
        perceivedEffect,
        degreeOfSideEffect,
        symptomOfSideEffect,
        dosage
      }
    });

    return res.json({ contents });
  } catch (error) {
    next(error);
  }
};

module.exports = index;

/*
uncleanedMedicineData = {
  "id": 1,
  "RegistereingMedicineData": [  // 배열, map 처리
    {  // 첫 번째 배열 원소이자 obj
      "id": 1,  // contents[0].id
      "RegisteredMedicineData": {
        "nameKr": "부프로피온",  // contents[0].medicineName
        "RegisteredMedicinePurposeData": [  // purposeData(변수)
          // 처방 목적이 여러 개 등록될 수 있지만(최종설계 상, DB 설계 상: 1대 다) mvp에서는 기능상 한 개만 등록할 수 있다.
          {
            "id": 1,
            "perceivedEffectiveness": "3",
            "UsedMedicineForDiagnosis": {
              "nameKr": "주요 우울증"
            },
            "UsedMEdicineForSymptom": {}
          },
          { ... }
        ],
        "RegisteredMedicineEvaluationData": [
          // 특정 purpose에 대해 종속하는 평가 데이터(DB 설계 상으로는 그렇지 않지만 기능상으로는 그렇다).
          // 따라서 1대다(하나의 처방약 데이터에 대해 여러 개의 평가가 있을 수 있음. 목적이 여러 개가 있을 수 있음에 따라.)
          {
            "sideEffects": 3
            "fkMedicineId": 5  // 어디에 쓰이나?
          },
          { ... }
        ]
    },
    
    {  // 두 번째 배열 원소이자 obj
      "id": 2,
      "RegisteredMedicineData": {
        ...
    }

  }
}
*/