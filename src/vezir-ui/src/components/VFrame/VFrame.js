import { useRef, useState } from 'react';

export default function VFrame() {
  const googleUrl = 'https://boyner.com.tr/';

  const refBook = useRef(null);
  const refPage = useRef(null);
  const refIframe = useRef(null);
  const [iframSrc, setIframeUrl] = useState(googleUrl);

  const goBook = () => {
    setIframeUrl(
      `${googleUrl}/b=${refBook.current.value}&p=${refPage.current.value}`
    );
  };
  return (
    <div className="App">
      <input type="number" ref={refBook}></input>
      <input type="number" ref={refPage}></input>
      <button type="button" onClick={goBook}>
        Submit
      </button>
      <iframe
        title="myBook"
        src="https://www.youtube.com/embed/uXWycyeTeCs"
        height="720"
        width="1280"
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
        ref={refIframe}
      ></iframe>
    </div>
  );
}
