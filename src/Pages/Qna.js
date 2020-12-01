import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import Fade from 'react-reveal/Fade'

import Question from '../Components/Question'
import { addQuestion } from '../actions/qnaActions'

import './../Components/Question.scss'

const Qna = () => {
    const questions = useSelector(state => state.qna.questions)
    const userType = useSelector(state => state.user.type)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [ qnaActive, setQnaActive ] = useState(false)
    const dispatch = useDispatch()
    const inputEl = useRef(null)
    const endOfBlock = useRef(null)
    const questionsToShow = userType === 'admin' ? questions : questions.filter(questions => questions.approved === true)

    questionsToShow.sort((a, b) => b.likes - a.likes)

    const addAQuestionHandler = () => {
        if (inputEl.current.value) {
            const newQuestion = {
                id: Date.now(),
                likes: 0,
                approved: false,
                text: inputEl.current.value,
                author: 'Anonymous'
            }
            dispatch(addQuestion(newQuestion))
            scrollToBottom()
            inputEl.current.value = ''

            if (userType !== 'admin') {
                const key = enqueueSnackbar('Your question was added and will be shown after moderation', {
                    onClick: () => {
                        closeSnackbar(key)
                    }
                })
            }
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
            {userType === 'admin' && (qnaActive
                ? <button type="button" className="btn btn-danger btn-lg btn-block mb-4" onClick={() => setQnaActive(false)}>Deactivate QnA</button>
                : <button type="button" className="btn btn-success btn-lg btn-block mb-4" onClick={() => setQnaActive(true)}>Activate QnA</button>)}
            <div className="qna">
                {questionsToShow.length 
                    ? questionsToShow.map((item) => 
                        <Fade key={item.id} bottom>
                            <Question question={item}/>
                        </Fade>
                    )
                    : <span>There are no quetions yet</span>}
                    <div className="p-5" ref={endOfBlock}></div>
            </div>
            {qnaActive && <div className="qna-inputbox container input-group mt-auto">
                <input type="text" ref={inputEl} onKeyPress={keyHandler} className="form-control" placeholder="Write your question" aria-label="Write your question" aria-describedby="button-addon2" />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={addAQuestionHandler} type="button" id="button-addon2">Send</button>
                </div>
            </div>}
        </div>
    )
}

export default Qna