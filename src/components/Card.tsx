import { SetStateAction, useState } from "react";
import Image from "next/image";
// import Loader from "./Loader";
import Alert from "@/components/Alert";
import { checkQueue, generateImage } from "@/app/imagine"

export default function Card() {
    const [prompt, setPrompt] = useState('')
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('https://avatars.githubusercontent.com/u/165787630?v=4'); // آدرس اولیه تصویر
    const [alert, setAlert] = useState('');
    // const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = () => {
        if(prompt === '') {
            setIsInputDisabled(false);
            setAlert("please enter an prompt");
        } else {
            // setAlert(false);
            setIsInputDisabled(true);
            setIsLoading(true);
            generateImage(prompt).then((url) => {
                checkQueue(url.uid).then((result: any) => {
                    if(result) {
                        console.log(result)
                        setImageUrl(result.image.url);
                        setIsLoading(false);
                        setIsInputDisabled(false);
                    } else {
                      setAlert("have a problem");
                    }
                })
            })
        }
    }

  return (
    <div className="card bg-neutral w-5/6 shadow-xl">
        <figure className="px-10 pt-10">
            {/* {isLoading && <Loader /> } */}
            <Image
            src={imageUrl}
            alt="imagine"
            width={500}
            height={500}
            style={{
                filter: isLoading ? 'blur(10px)' : 'none',
                transition: 'filter 0.3s ease-in-out',
              }}
            className="rounded-xl" />
{/* } */}
        </figure>
        <div className="card-body items-center text-center">
            {alert && <Alert message={alert} />}
            <h2 className="card-title">start create images!</h2>
            <label className="input input-bordered flex items-center gap-4 w-4/5">
                <span className="badge badge-info">PROMPT</span>
                <input type="text" onChange={handleChange} disabled={isInputDisabled} value={prompt} className="grow" placeholder="Type here ..." />
            </label>
            <p>{prompt.length}/500</p>
            <div className="card-actions">
                <button className="btn btn-primary btn-outline rounded-lg w-48" onClick={() => {
                  handleSubmit()
                  // setAlert(false)
                  setIsInputDisabled(true)
                  }
                }
                  >CREATE</button>
            </div>
        </div>
    </div>
  );
}