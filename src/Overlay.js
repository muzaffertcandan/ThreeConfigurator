import { Logo } from "@pmndrs/branding";
import { useSnapshot } from "valtio";
import { state } from "./store";
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft
} from "react-icons/ai";

export default function Overlay() {
  const snap = useSnapshot(state);
  console.log(snap);
  return (
    <div className="container">
      <header>
        <Logo width="40" height="40" />
        <AiOutlineShopping size="3em" className="shop-cart"/>
      </header>
      {snap.intro ? <Intro /> : <Customizer />}
    </div>
  );
}

function Intro() {
  return (
    <section key="main">
      <div className="section--container">
        <div>
          <h1>YENİ NESİL ALIŞVERİŞ</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              AR VR Teknolojilerimiz ile müşterilerinize <strong>unutamayacakları</strong> deneyimler sunun
            </p>
            <button
              className="black-button"
              onClick={() => {
                state.intro = false;
              }}
            >
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Customizer() {
  const colors = [
    "#ccc",
    "#EFBD4E",
    "#80C670",
    "#726DE8",
    "#EF674E",
    "#353934",
    "Pink"
  ];
  const decals = ["react", "three2", "pmndrs", "exar"];

  return (
    <section key="custom">
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => {
                state.selectedColor = color;
              }}
            ></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {decals.map((decal) => (
              <div key={decal} className="decal"
              onClick={()=> (state.selectedDecal = decal)}>
                <img src={decal + "_thumb.png"} alt="brand" />
              </div>
            ))}
          </div>
        </div>
        <button className="share"
        
         style={{ background: state.selectedColor }}
         onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'canvas.png')
            link.setAttribute(
              'href',
              document
                .querySelector('canvas')
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream')
            )
            link.click()
          }}>
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
        <button
          className="exit"
          style={{ background: state.selectedColor }}
          onClick={() => {
            state.intro = true;
          }}
        >
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </section>
  );
}
