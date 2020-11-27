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

    const addAQuestionHandler = () => {
        if (inputEl.current.value) {
            const newQuestion = {
                id: Date.now(),
                likes: 0,
                text: inputEl.current.value,
                author: 'Anonymous'
            }
            dispatch(addQuestion(newQuestion))
            inputEl.current.value = ''
        }
    }

    const keyHandler = (e) => {
        if (e.charCode === 13) {
            addAQuestionHandler()
        }
    }

    return (
        <div className="d-flex flex-column flex-fill">
            <div className="qna">
                {questions.length 
                    ? questions.map(item => 
                        <Fade key={item.id} bottom>
                            <Question question={item}/>
                        </Fade>
                    )
                    : <span>There are no quetions yet</span>
                }
            </div>
            <div className="input-group mt-auto">
                <input type="text" ref={inputEl} onKeyPress={keyHandler} className="form-control" placeholder="Write your question" aria-label="Write your question" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={addAQuestionHandler} type="button" id="button-addon2">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Qna