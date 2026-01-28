let words = []
let current = null

function addWord() {
  const de = document.getElementById("de").value
  const uz = document.getElementById("uz").value
  if (!de || !uz) return alert("So‘zlarni to‘liq kiriting")

  words.push({ de, uz, weight: 1 })

  document.getElementById("de").value = ""
  document.getElementById("uz").value = ""
}

function weightedRandom() {
  const total = words.reduce((s, w) => s + w.weight, 0)
  let r = Math.random() * total
  for (let w of words) {
    if (r < w.weight) return w
    r -= w.weight
  }
}

function startTest() {
  if (words.length < 4) {
    alert("Kamida 4 ta so‘z kerak")
    return
  }
  nextQuestion()
}

function nextQuestion() {
  current = weightedRandom()
  document.getElementById("question").innerText =
    `So‘zning ma'nosi nima? → ${current.de}`

  // variantlar
  let options = [current.uz]

  while (options.length < 4) {
    let rand = words[Math.floor(Math.random() * words.length)].uz
    if (!options.includes(rand)) options.push(rand)
  }

  options.sort(() => Math.random() - 0.5)

  const box = document.getElementById("options")
  box.innerHTML = ""

  options.forEach(opt => {
    const btn = document.createElement("button")
    btn.className = "option"
    btn.innerText = opt
    btn.onclick = () => check(opt)
    box.appendChild(btn)
  })
}

function check(answer) {
  if (answer === current.uz) {
    alert("✅ To‘g‘ri!")
    current.weight = Math.max(1, current.weight - 1)
  } else {
    alert("❌ Xato. To‘g‘risi: " + current.uz)
    current.weight += 2
  }
  nextQuestion()
}