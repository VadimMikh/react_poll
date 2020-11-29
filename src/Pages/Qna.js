import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Fade from 'react-reveal/Fade';

import Question from '../Components/Question'
import { addQuestion } from '../actions/qnaActions'

import './../Components/Question.scss'

const Qna = () => {
    const questions = useSelector(state => state.qna.questions)
    const dispatch = useDispatch()
    const inputEl = useRef(null)
    const endOfBlock = useRef(null)

    const addAQuestionHandler = () => {
        if (inputEl.current.value) {
            const newQuestion = {
                id: Date.now(),
                likes: 0,
                text: inputEl.current.value,
                author: 'Anonymous'
            }
            dispatch(addQuestion(newQuestion))
            scrollToBottom()
            inputEl.current.value = ''
        }
    }

    const scrollToBottom = () => {
        endOfBlock.current.scrollIntoView({ behavior: 'smooth' })
    }

    const keyHandler = (e) => {
        if (e.charCode === 13) {
            addAQuestionHandler()
        }
    }

    return (
        <div className="d-flex flex-column flex-fill pb-5">
            <div className="qna">
                {questions.length 
                    ? questions.map((item, i) => 
                        <Fade key={item.id} bottom>
                            <Question question={item}/>
                        </Fade>
                    )
                    : <span>There are no quetions yet</span>}
                    <div className="p-5" ref={endOfBlock}></div>
            </div>
            <div className="qna-inputbox container input-group mt-auto">
                <input type="text" ref={inputEl} onKeyPress={keyHandler} className="form-control" placeholder="Write your question" aria-label="Write your question" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={addAQuestionHandler} type="button" id="button-addon2">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Qna