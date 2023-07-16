
import { Box, Button, Checkbox, Heading, Input, Stack, Text , Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select} from "@chakra-ui/react"
import { MoonIcon,CloseIcon,EditIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adddata, clearcomleteddata, deleteitem, edititem, editstatus,  filteractive, filtercomplete } from "../redux/action"


export const Todo = () => {
    const [task, settask] = useState("")
    const [edittask,setedittask]=useState("")

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [datalength, setdatalength] = useState(0)
    const data = useSelector((store) => store.reducer)
    const [showdata,setshowdata]=useState([])
    const dispatch = useDispatch()
    function getdata(){
        setshowdata(data.todos)
    }
    useEffect(() => {
       getdata()
        setdatalength(data.todos.length)
    }, [data.todos])
   console.log(showdata)
   
    function handleaddtodo() {
        let obj = {
            task,
            status: false
        }
        dispatch(adddata(obj))
        setshowdata(data.todos)
        settask("")
    }


    function handlefilter(e){
        if(e.target.name==="active"){
        //    dispatch(filteractive(data))
        let actived=data.todos.filter((item)=>{
            if(!item.status){
                return true
            }
            return false
        })
            setshowdata(actived)
        }
        else if(e.target.name==="completed"){
            // dispatch(filtercomplete(data))
            let comple=data.todos.filter((item)=>{
                if(!item.status){
                    return false
                }
                return true
            })
            setshowdata(comple)
        }
        else{
            getdata() 
        }
    }

    function handlestatus(e){
        dispatch(editstatus(e.target.name,data)) 
    }

    function handledelete(e){ 
        dispatch(deleteitem(e,data))
    }

    function handleclearcompleted(){
        dispatch(clearcomleteddata(data))
    }
    function handleedit(task){
        onOpen()
        data.todos.forEach((item)=>{
            if(item.task==task){
                setedittask(item.task)
              
            }
        })
        
    }
    
    function handleeditaction(item){
        let obj={
            task:edittask,
         
        }
        dispatch(edititem(item,obj,data))
        onClose()
    }
    
    return <Box height={'100vh'} >
        <Box h={'30%'} w={'100%'}  backgroundColor={'#141a58'}>
        </Box>
        <Box h={'70%'} w={'100%'} backgroundColor={'#ECEFF1'}>
            <Box height={'80%'} width={'70%'} position={'absolute'} top={'10%'} left={'15%'}>
                <Box height={'13%'} width={'100%'}  display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Heading as={'h1'} color={'white'}>TODO</Heading>

                    {/* <MoonIcon color={'white'} /> */}
                </Box>
                <Box margin={'auto'} marginBottom={'1%'} display={'flex'}  >
                    <Input placeholder='Add the Task' backgroundColor={'white'}  borderColor={'transparent'} onChange={(e) => settask(e.target.value)} value={task} size='md' borderRadius={'7px 0px 0px 7px'} />
                    <Button borderRadius={'0px 7px 7px 0px'} backgroundColor={'white'} borderColor={'transparent'} onClick={handleaddtodo}>Add</Button>
                </Box>

                <Box height={'67%'} width={'100%'} backgroundColor={'white'}  overflow={'scroll'} overflowX={'hidden'} overflow-y={"auto"}>
                    {showdata.map((item) => <Box key={item.task} display={'flex'} justifyContent={'space-between'}>
                      <Stack direction={'column'} >
                        
                            <Checkbox isChecked={item.status} size='lg' name={item.task} onChange={(e)=>handlestatus(e)}  colorScheme='purple' p={'10px 10px'}>
                                {item.task}
                            </Checkbox>
                            </Stack>
                       
                       
                        <Box  gap={'50px'} display={'flex'}  p={'10px 10px'}>
                            <Box onClick={()=>handleedit(item.task)}>
                            <EditIcon _hover={{cursor:'pointer'}} />
                            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input mb={"15px"} placeholder={'Task'} value={edittask} onChange={(e)=>setedittask(e.target.value)}/>
          

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={()=>handleeditaction(item)}>EDIT</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
                            </Box>
                            <Box  onClick={()=>handledelete(item.task)}>
                            <CloseIcon />
                            </Box>
                        </Box>


                    </Box>)

                    }
                </Box>
                <Box width={'100%'} backgroundColor={'white'} padding={'5px 10px'} >
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box><Text> {datalength} lefts  item</Text></Box>
                        <Box >
                            <Button size='sm' name="all" onClick={(e)=>handlefilter(e)} backgroundColor={'transparent'} >
                                All
                            </Button>
                            <Button size='sm' name="active" onClick={(e)=>handlefilter(e)}  backgroundColor={'transparent'}>
                                Active
                            </Button>
                            <Button size='sm' name="completed" onClick={(e)=>handlefilter(e)} backgroundColor={'transparent'}>
                                Completed
                            </Button>
                        </Box>
                        <Box>
                            <Button size='sm' backgroundColor={'transparent'} onClick={handleclearcompleted}>
                                Clear Completed Component
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
        

    </Box>
}

