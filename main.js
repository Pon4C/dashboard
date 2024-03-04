let initListExam = {
  1: {
    examName: "Cơ sở dữ liệu",
    examType: "Thời gian cụ thể",
    examDescription: "",
    examTime: "60",
    examStartTime: "2022-03-03",
    examEndTime: "2-3-2024",
    examCreatedAt: "29-2-2024",
    examlistQuestion: {
      1: {
        topic: "Trường khóa chính là trường?",
        listAnswer: {
          A: "Single Key",
          B: "First Key",
          C: "Foreign Key",
          D: "Primary Key",
        },
        correctAnswer: "D",
      },
      2: {
        topic: "Đặc trưng cấu trúc của mô hình mạng là?",
        listAnswer: {
          A: "Chứa các liên kết một - một và một - nhiều",
          B: "Chứa các liên kết một - một, một - nhiều và nhiều - nhiề",
          C: "Chứa các liên kết một - một, một - nhiều và nhiều - nhiều",
          D: "Chứa các liên kết nhiều - một và một - nhiều",
        },
        correctAnswer: "A",
      },
      3: {
        topic: "Trong mô hình cơ sở dữ liệu quan hệ?",
        listAnswer: {
          A: "Thứ tự của các cột là quan trọng",
          B: "Thứ tự của các cột là không quan trọng",
          C: "Thứ tự của các hàng là quan trọng",
          D: "Thứ tự của các hàng là không quan trọng",
        },
        correctAnswer: "B",
      },
      4: {
        topic: "Thực thể là?",
        listAnswer: {
          A: "Các đối tượng dữ liệu",
          B: "Các quan hệ",
          C: "Các mối liên kết giữa các đối tượng",
          D: "Các đối tượng và mối liên kết giữa các đối tượng",
        },
        correctAnswer: "A",
      },
    },
  },
  2: {
    examName: "Cuối kì môn Vật lí 2",
    examType: "Thời gian cụ thể",
    examDescription: "",
    examCreatedAt: "2022-03-03",
    examTime: "20-2-2024",
    examlistQuestion: {
      1: {
        topic: "Hiện tượng giao thoa ánh sáng chứng tỏ",
        listAnswer: {
          A: "Tính chất gián đoạn của ánh sáng",
          B: "Ánh sáng là một sống dọc",
          C: "Bản chất sóng của ánh sáng",
          D: "Ánh sáng là một sóng ngang",
        },
        correctAnswer: "A",
      },
      2: {
        topic: "Giao thoa ánh sáng là hiện tượng",
        listAnswer: {
          A: "Gặp nhau của hai hay nhiều sóng ánh sáng tự nhiên",
          B: "Gặp nhau của hai hay nhiều sóng ánh sáng kết hợp",
          C: "Gặp nhau của hai hay nhiều sóng ánh sáng phân cực",
          D: "Gặp nhau của hai nhiều sóng ánh sáng phân cực",
        },
        correctAnswer: "B",
      },
    },
  },
};
let questionIndex = 0;
let listQuestion = {};

let listExam = JSON.parse(window.localStorage.getItem("list-exam"));

const getListExam = () => {
  return window.localStorage.get("list-exam");
};

const setListExam = (newListExam) => {
  window.localStorage.setItem("list-exam", JSON.stringify(newListExam));
};

if (!window.localStorage.getItem("list-exam")) {
  setListExam(initListExam);
}

const redirectToNewPage = (new_page, paramName, paramValue) => {
  if (paramName !== undefined && paramValue !== undefined) {
    const encodedParamName = encodeURIComponent(paramName);
    const encodedParamValue = encodeURIComponent(paramValue);

    const separator = new_page.includes("?") ? "&" : "?";

    window.location.href = `${new_page}${separator}${encodedParamName}=${encodedParamValue}`;
  } else {
    window.location.href = new_page;
  }
};

//Edit  page
const closePopUp = () => {
  document.getElementById("popup").style["visibility"] = "hidden";
};

const openPopUp = (examId, questionId) => {
  document.getElementById("popup").style["visibility"] = "visible";

  const question = listExam[examId]["examlistQuestion"][questionId];
  const { topic, listAnswer, correctAnswer } = question;

  //Chèn câu hỏi
  document.getElementById("edit-topic-input").value = topic;
  document.getElementById("edit-answer-a-input").value = listAnswer["A"];
  document.getElementById("edit-answer-b-input").value = listAnswer["B"];
  document.getElementById("edit-answer-c-input").value = listAnswer["C"];
  document.getElementById("edit-answer-d-input").value = listAnswer["D"];

  //Thêm onclick cho 2 button xóa và lưu
  document.getElementById("popup-del-question").onclick = function () {
    delQuestion(examId, questionId);
  };
  document.getElementById("popup-save-question").onclick = function () {
    saveQuestion(examId, questionId);
  };

  const radioInputs = document.getElementsByName("edit-answer");
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].value === correctAnswer) {
      radioInputs[i].checked = true;
      break;
    }
  }
};

const closeGeneralPopUp = () => {
  document.getElementById("general-popup").style["visibility"] = "hidden";
};

const openGeneralPopup = () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  const {
    examName,
    examType,
    examDescription,
    examTime,
    examStartTime,
    examEndTime,
  } = listExam[examId];

  document.getElementById("general-popup").style["visibility"] = "visible";

  //Chèn thông tin chung của kì thi
  document.getElementById("popup-general-name").value = examName;
  document.getElementById("popup-general-type").value = examType;
  document.getElementById("popup-general-start-time").value =
    examType === "Thời gian cụ thể" ? examStartTime : null;
  if (examType === "Thời gian cụ thể") console.log(examStartTime);
  document.getElementById("popup-general-end-time").value =
    examType === "Thời gian cụ thể" ? examEndTime : null;
  document.getElementById("popup-general-description").value = examDescription;
};

const saveGeneralPopup = () => {
  const examId = new URLSearchParams(window.location.search).get("id");
};

const delQuestion = (examId, questionId) => {
  delete listExam[examId]["examlistQuestion"][questionId];
  setListExam(listExam);
  redirectToNewPage("exam.html");
  loadManageExamPage(examId);
  closePopUp();
};

const saveQuestion = (examId, questionId) => {
  const topic = document.getElementById("edit-topic-input").value;
  const answer_a = document.getElementById("edit-answer-a-input").value;
  const answer_b = document.getElementById("edit-answer-b-input").value;
  const answer_c = document.getElementById("edit-answer-c-input").value;
  const answer_d = document.getElementById("edit-answer-d-input").value;

  let correctAnswer = "";
  const radioInputs = document.getElementsByName("edit-answer");
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked === true) {
      correctAnswer = radioInputs[i].value;
      break;
    }
  }

  const editedQuestion = {
    topic: topic,
    listAnswer: {
      A: answer_a,
      B: answer_b,
      C: answer_c,
      D: answer_d,
    },
    correctAnswer: correctAnswer,
  };

  listExam[examId]["examlistQuestion"][questionId] = editedQuestion;
  setListExam(listExam);
  loadManageExamPage(examId);
  closePopUp();
};

const delExam = () => {
  const examId = new URLSearchParams(window.location.search).get("id");
  document.addEventListener("DOMContentLoaded", loadManageExamPage(examId));

  delete listExam[examId];
  setListExam(listExam);
};

//Add page
const addQuestion = (
  topic,
  answer_a,
  answer_b,
  answer_c,
  answer_d,
  correct_answer
) => {
  const newQuestionBox = document.createElement("div");
  const newQuestion = {
    topic: "",
    listAnswer: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    correctAnswer: "A",
  };

  newQuestionBox.classList.add("question-box");
  newQuestionBox.id = `questionIndex-${questionIndex}`;

  const answerContainer = document.createElement("div");
  answerContainer.innerHTML = `
    <span class="topic"
      >${topic}</span
    >
    <form onchange="onChangeCorrectAnswer(this, ${questionIndex})">
      <label class="answer">
        <input type="radio" name="answer" value="A"  ${
          correct_answer === "A" ? "checked" : ""
        } /> A.
        ${answer_a}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="B" ${
          correct_answer === "B" ? "checked" : ""
        }/> B.
        ${answer_b}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="C" ${
          correct_answer === "C" ? "checked" : ""
        }/> C.
         ${answer_c}
      </label>
      <label class="answer">
        <input type="radio" name="answer" value="D" ${
          correct_answer === "D" ? "checked" : ""
        }/> D.
        ${answer_d}
      </label>
    </form>
  `;
  newQuestionBox.appendChild(answerContainer);

  document.getElementById("list-question-box").appendChild(newQuestionBox);

  newQuestion["topic"] = topic;
  newQuestion["listAnswer"]["A"] = answer_a;
  newQuestion["listAnswer"]["B"] = answer_b;
  newQuestion["listAnswer"]["C"] = answer_c;
  newQuestion["listAnswer"]["D"] = answer_d;

  listQuestion[questionIndex] = newQuestion;

  questionIndex += 1;
};

const addQuestionByManual = () => {
  const topic = document.getElementById("topic-input").value;
  const answer_a = document.getElementById("answer-a-input").value;
  const answer_b = document.getElementById("answer-b-input").value;
  const answer_c = document.getElementById("answer-c-input").value;
  const answer_d = document.getElementById("answer-d-input").value;
  const correct_answer = "A";

  addQuestion(topic, answer_a, answer_b, answer_c, answer_d, correct_answer);
};

const addQuestionByFile = () => {
  const input = document.getElementById("create-file-input");

  if (input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];
      const lastRow = parseInt(sheet["!ref"].split(":")[1].match(/\d+/)[0]);
      for (let i = 2; i <= lastRow; i++) {
        const topic = sheet[`A${i}`].v;
        const answer_a = sheet[`B${i}`].v;
        const answer_b = sheet[`C${i}`].v;
        const answer_c = sheet[`D${i}`].v;
        const answer_d = sheet[`E${i}`].v;
        const correct_answer = sheet[`F${i}`].v;
        addQuestion(
          topic,
          answer_a,
          answer_b,
          answer_c,
          answer_d,
          correct_answer
        );
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

function parseSheet(sheet) {
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });
  const result = [];
  let currentQuestion = {};

  for (const row of data) {
    if (row[0].startsWith("Câu")) {
      if (Object.keys(currentQuestion).length > 0) {
        result.push(currentQuestion);
      }

      currentQuestion = { question: row[0], options: [] };
    } else {
      const option = { A: row[1], B: row[2], C: row[3], D: row[4] };
      currentQuestion.options.push(option);
    }
  }

  if (Object.keys(currentQuestion).length > 0) {
    result.push(currentQuestion);
  }

  return result;
}

const onChangeCorrectAnswer = (form, id) => {
  const selectedValue = form.querySelector(
    'input[name="answer"]:checked'
  ).value;
  listQuestion[id]["correctAnswer"] = selectedValue;
};

const saveNewExam = () => {
  const dateNow = Date.now();
  const newExam = {
    examName: document.getElementById("exam-name").value,
    examType: document.getElementById("exam-type").value,
    examDescription: document.getElementById("exam-description").value,
    examCreatedAt: "29-2-2024",
    examlistQuestion: listQuestion,
  };
  listExam[dateNow] = newExam;
  setListExam(listExam);
};

const loadExamPage = () => {
  let examId = 1;
  Object.keys(listExam).forEach((examKey) => {
    const {
      examName,
      examType,
      examDescription,
      examCreatedAt,
      examlistQuestion,
    } = listExam[examKey];

    const examRow = document.createElement("tr");
    examRow.onclick = function () {
      redirectToNewPage("manage-exam.html", "id", examKey);
    };

    examRow.innerHTML = `
      <td>${examId++}</td>
      <td>${examName}</td>
      <td>${examType}</td>
      <td>${Object.keys(examlistQuestion).length}</td>
      <td>${examCreatedAt}</td>
      <td class="description-col">
        ${examDescription}
      </td>
  `;

    document.getElementById("exam-list").appendChild(examRow);
  });
};

const loadManageExamPage = (examId) => {
  const exam = listExam[examId];
  const {
    examName,
    examType,
    examDescription,
    examCreatedAt,
    examTime,
    examlistQuestion,
  } = exam;

  // Chèn thông tin chung
  document.getElementById("manage-exam-name").innerText = examName;
  document.getElementById("manage-general-exam-name").innerText = examName;
  document.getElementById("manage-exam-time").innerText = examTime
    ? examTime
    : "";
  document.getElementById("manage-exam-type").innerText = examType;
  document.getElementById("manage-exam-question-total").innerText =
    Object.keys(examlistQuestion).length;

  //Xóa tất cả các câu hỏi đang có
  const manageQuestionContent = document.getElementById(
    "manage-quetion-content"
  );

  while (manageQuestionContent.firstChild) {
    manageQuestionContent.removeChild(manageQuestionContent.firstChild);
  }

  //Thêm câu hỏi
  let questionIndex = 1;
  Object.keys(examlistQuestion).forEach((questionId) => {
    const question = examlistQuestion[questionId];
    const { topic, listAnswer, correctAnswer } = question;

    const newQuestionBox = document.createElement("div");
    newQuestionBox.classList.add("question-box");
    newQuestionBox.onclick = function () {
      openPopUp(examId, questionId);
    };
    const answerContainer = document.createElement("div");
    answerContainer.innerHTML = `
    <span class="topic"
      >Câu ${questionIndex++}:</span
    >
    <span>${topic}</span>
    <div class="manage-list-answer">
      <span class="answer"> 
        A. ${listAnswer["A"]}
      </span>
       <span class="answer"> 
        B. ${listAnswer["B"]}
      </span>
       <span class="answer"> 
        C. ${listAnswer["C"]}
      </span>
       <span class="answer"> 
        D. ${listAnswer["D"]}
      </span>
    </div>
    <div><span>Đáp án đúng: ${correctAnswer}</span></div>
  `;
    newQuestionBox.appendChild(answerContainer);

    document
      .getElementById("manage-quetion-content")
      .appendChild(newQuestionBox);
  });
};
