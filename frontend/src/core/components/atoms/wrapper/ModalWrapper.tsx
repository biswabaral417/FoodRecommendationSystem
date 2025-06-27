const ModalWrapper: React.FC<{ modalWrapperVis: boolean }> = ({ modalWrapperVis }) => {

  if (modalWrapperVis) {
    return (
      <div className={`  visible z-5 bg-gray-400 opacity-60 absolute w-full h-screen block`} >
      </div >
    )
  }
  return (
    <div className={`hidden   z-5 bg-gray-400 opacity-60 absolute w-full h-screen block`} >
    </div >
  )

}
export default ModalWrapper