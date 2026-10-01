'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
export function FaqAccordion({ questions }: { questions: { question: string; answer: string }[] }) {
  const [opened, setOpened] = useState<number[]>([])
  return <div className="faq-list">{questions.map(({ question, answer }, index) => {
    const open = opened.includes(index)
    return <section className="faq-item" key={question}><h2><button id={`faq-question-${index}`} type="button" aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={() => setOpened(previous => open ? previous.filter(value => value !== index) : [...previous, index])}>{question}<Plus aria-hidden="true" /></button></h2><div className={`faq-answer${open ? ' is-open' : ''}`} id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!open}><div><p>{answer}</p></div></div></section>
  })}</div>
}
