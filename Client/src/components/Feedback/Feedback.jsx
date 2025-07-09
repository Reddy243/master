import { useState, useContext} from "react";
import './Feedback.css';
import { UserContext } from '../../UserContext';

function Feedback(){
    //const url = "http://localhost:3000";
    const url = "https://myshop-backend-fop9.onrender.com";
    const [ feedback, setFeedback ] = useState("");
    const [ isFeedBackSubmitted, setFeedbackStatus ] = useState(false);
    const { name } = useContext(UserContext); 
    const handleFeedback = async (e) =>{
        e.preventDefault();
        if(feedback.length <= 0){ 
            {/* The Following is for no comment entered */}
            return console.log("enter feedback");
        }
        {/* For Stroing values in DB, we are handling in node js via api call. Since we are using fetch which returns a promise we need to use await which must be in async function, so the function we need to change as async*/}
        try{
            const response = await fetch(`${url}/api/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, feedback }) // ✅ stringify the body
            });
            const data = await response.json();
            console.log("data"+ data.message);
            setFeedbackStatus(true);
        }
        catch(e){
            console.log("Error: "+e.message);
        }
    }

    function handleEnteredFeedback(e){
        setFeedback(e.target.value);
    }

    return (
        <div className="feedback_form">
            {!isFeedBackSubmitted && name.length > 0 ? (
                <>
                    <div className="h2" id="feedback"> Feedback <i className="fa-solid fa-comments"></i></div>
                    <form onSubmit={handleFeedback}>
                        <div className="feedback">
                            <label htmlFor="feedback">Submit your valuable feedback:</label>
                            <textarea 
                                onChange={handleEnteredFeedback}
                                maxLength={200}
                                value={feedback}
                            ></textarea>
                            <p className="charCount">{feedback.length}/200 characters</p>
                        </div>
                        <div className="SubmitFeedback" id="SubmitFeedback">
                            <button>Submit</button>
                        </div>
                    </form>
                </>
            ) : name.length > 0 ?
            (
                <div className="successFeed">
                    <p>Thanks for submitting valuable feedback</p>
                </div>
            ) : (
            <div className="successFeed">
                <p>Please make atleast one Order for submitting valuable feedback</p>
            </div>)
            }
        </div>        
    );
}

export default Feedback;
