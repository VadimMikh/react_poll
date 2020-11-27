import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Sprite from './../../node_modules/bootstrap-icons/bootstrap-icons.svg'
import { likeQuestion, dislikeQuestion, deleteQuestion } from '../actions/qnaActions'

const Question = (props) => {
    const { question } = props
    const userType = useSelector(state => state.user.type)
    const [liked, setliked] = useState(false);
    const dispatch = useDispatch();

    const likesHandler = () => {
        const hadnler = liked ? dislikeQuestion : likeQuestion
        
        dispatch(hadnler(question.id))
        setliked(!liked)
    }

    const deleteQuestionHandler = () => {
        dispatch(deleteQuestion(question.id))
    }

    return (
        <div className="qna-question alert alert-light alert-dismissible">
            <div className="d-flex align-items-center mb-2">
                <svg className="bi" width="16" height="16">
                    <use href={ Sprite + "#person-circle" }/>
                </svg>
                <span className="qna-question-author ml-2">{question.author}</span>
            </div>
            <p className="qna-question-text mb-0">{question.text}</p>
            <a type="button" className="qna-question-like d-flex align-items-center" onClick={likesHandler}>
                <span className="mr-1">{question.likes}</span>
                <svg className="bi" width="16" height="16">
                    <use href={ Sprite + "#hand-thumbs-up" }/>
                </svg>
            </a>
            {userType === 'admin' && <button type="button" onClick={deleteQuestionHandler} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>}
        </div>
    );
}

export default Question
