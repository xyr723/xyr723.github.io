"use strict";

const QUESTIONS = Object.freeze([
  {
    id: "morning",
    prompt: "如果明天没有任何安排，你通常会怎样开始一天？",
    options: [
      { value: "plan", label: "先列一份简单计划" },
      { value: "flow", label: "醒来后再看心情" },
    ],
  },
  {
    id: "logic",
    prompt: "一个时钟每小时慢 2 分钟，5 小时后共慢多少分钟？",
    options: [
      { value: "ten", label: "10 分钟" },
      { value: "twelve", label: "12 分钟" },
      { value: "eight", label: "8 分钟" },
    ],
  },
  {
    id: "message",
    prompt: "收到一条需要认真回复的长消息时，你更倾向于？",
    options: [
      { value: "reply", label: "整理好思路后一次回复" },
      { value: "talk", label: "直接约对方聊一聊" },
    ],
  },
  {
    id: "route",
    prompt: "去一个陌生地点前，你通常会？",
    options: [
      { value: "map", label: "提前查看路线" },
      { value: "explore", label: "到附近再慢慢找" },
    ],
  },
  {
    id: "weather",
    prompt: "判断题：先看到闪电、后听到雷声，是因为光传播得更快。",
    options: [
      { value: "true", label: "正确" },
      { value: "false", label: "错误" },
    ],
  },
  {
    id: "weekend",
    prompt: "理想周末更接近下面哪一种？",
    options: [
      { value: "outdoor", label: "出门体验新鲜事物" },
      { value: "indoor", label: "留在熟悉的空间充电" },
    ],
  },
  {
    id: "decision",
    prompt: "面对两个都不错的选择时，你更相信？",
    options: [
      { value: "evidence", label: "比较信息后的判断" },
      { value: "instinct", label: "第一时间的直觉" },
    ],
  },
  {
    id: "team",
    prompt: "小组讨论陷入沉默时，你更可能？",
    options: [
      { value: "open", label: "主动抛出一个话题" },
      { value: "observe", label: "先观察大家的反应" },
    ],
  },
  {
    id: "detail",
    prompt: "阅读一篇长文章时，你更容易记住？",
    options: [
      { value: "idea", label: "整体观点" },
      { value: "example", label: "具体例子" },
    ],
  },
  {
    id: "change",
    prompt: "原定计划临时改变，你通常会？",
    options: [
      { value: "adapt", label: "迅速调整并继续" },
      { value: "replan", label: "重新确认细节再行动" },
    ],
  },
].map((question) =>
  Object.freeze({
    ...question,
    options: Object.freeze(question.options.map((option) => Object.freeze(option))),
  }),
));

function createQuizState() {
  return { phase: "welcome", questionIndex: 0, answers: [] };
}

function startQuiz(state) {
  return { ...state, phase: "question" };
}

function answerQuestion(state, value) {
  const question = QUESTIONS[state.questionIndex];
  if (!question || !question.options.some((option) => option.value === value)) {
    throw new RangeError("答案不属于当前题目");
  }

  const answers = state.answers.slice();
  answers[state.questionIndex] = value;
  return { ...state, answers };
}

function advanceQuiz(state) {
  if (!state.answers[state.questionIndex]) {
    throw new Error("请先选择答案");
  }

  if (state.questionIndex === QUESTIONS.length - 1) {
    return { ...state, phase: "analysis" };
  }

  return { ...state, questionIndex: state.questionIndex + 1 };
}

function restartQuiz() {
  return createQuizState();
}

function getResult() {
  return {
    title: "测试结果",
    value: "你是 gay",
    disclaimer: "纯属娱乐，本测试不能判断任何人的性取向",
  };
}

function mountQuiz(documentLike, browserLike) {
  const views = [...documentLike.querySelectorAll("[data-view]")];
  const startButton = documentLike.querySelector("[data-start]");
  const form = documentLike.querySelector("[data-question-form]");
  const options = documentLike.querySelector("[data-options]");
  const nextButton = documentLike.querySelector("[data-next]");
  const progress = documentLike.querySelector("[data-progress]");
  const progressBar = documentLike.querySelector("[data-progress-bar]");
  const prompt = documentLike.querySelector("[data-prompt]");
  const restartButton = documentLike.querySelector("[data-restart]");
  const copyButton = documentLike.querySelector("[data-copy]");
  const status = documentLike.querySelector("[data-status]");
  let state = createQuizState();

  function showView(name) {
    views.forEach((view) => {
      view.hidden = view.dataset.view !== name;
    });
  }

  function renderQuestion() {
    const question = QUESTIONS[state.questionIndex];
    const currentNumber = state.questionIndex + 1;
    progress.textContent = `第 ${currentNumber} 题，共 ${QUESTIONS.length} 题`;
    progressBar.value = currentNumber;
    progressBar.textContent = `${currentNumber}/${QUESTIONS.length}`;
    prompt.textContent = question.prompt;
    options.replaceChildren(
      ...question.options.map((option) => {
        const label = documentLike.createElement("label");
        label.className = "option";

        const input = documentLike.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option.value;
        input.checked = state.answers[state.questionIndex] === option.value;

        const text = documentLike.createElement("span");
        text.textContent = option.label;
        label.append(input, text);
        return label;
      }),
    );
    nextButton.disabled = !state.answers[state.questionIndex];
    nextButton.textContent = currentNumber === QUESTIONS.length ? "查看分析" : "下一题";
    showView("question");
  }

  startButton.addEventListener("click", () => {
    state = startQuiz(state);
    renderQuestion();
    options.querySelector("input")?.focus();
  });

  options.addEventListener("change", (event) => {
    if (event.target.matches('input[name="answer"]')) {
      state = answerQuestion(state, event.target.value);
      nextButton.disabled = false;
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    state = advanceQuiz(state);

    if (state.phase === "analysis") {
      showView("analysis");
      browserLike.setTimeout(() => {
        showView("result");
        restartButton.focus();
      }, 1400);
      return;
    }

    renderQuestion();
    options.querySelector("input")?.focus();
  });

  restartButton.addEventListener("click", () => {
    state = restartQuiz();
    status.textContent = "";
    showView("welcome");
    startButton.focus();
  });

  copyButton.addEventListener("click", async () => {
    const result = getResult();
    const text = `${result.title}：${result.value}\n${result.disclaimer}\n${browserLike.location.href}`;

    try {
      await browserLike.navigator.clipboard.writeText(text);
      status.textContent = "结果已复制";
    } catch {
      status.textContent = "复制失败，请手动复制";
    }
  });

  showView("welcome");
}

const quizApi = {
  QUESTIONS,
  advanceQuiz,
  answerQuestion,
  createQuizState,
  getResult,
  mountQuiz,
  restartQuiz,
  startQuiz,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = quizApi;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => mountQuiz(document, window));
}
