import { React } from 'react';

export default function VFrame(props) {
  return (
    <div>
      <iframe
        width="1000px"
        height="1000px"
        src="https://giris.turkiye.gov.tr/Giris/gir"
        sandbox
      ></iframe>
    </div>
  );
}
