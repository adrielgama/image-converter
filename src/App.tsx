import { InputFile } from './app/InputFile'

function App() {
  return (
    <div className="w-screen h-screen bg-gradient2">
      <div className='w-full pt-32 container flex flex-col gap-6 justify-center items-center '>
        <img src="/src/assets/logo.png" alt="logo" className="h-32" />
        <InputFile />
      </div>
    </div>
  )
}

export default App
