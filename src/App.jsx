import ImageSlider from "./components/ImageSlider"


function App() {


  return (
    <>
    <ImageSlider url={"https://picsum.photos/v2/list"} page={1} limit={10}></ImageSlider>
    
    </>
  )
}

export default App
