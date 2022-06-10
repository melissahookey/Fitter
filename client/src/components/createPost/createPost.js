import React, {useState} from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Stack,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Center,
  Input,
  ListItem,
  IconButton,
  CircularProgress,
  List,


} from "@chakra-ui/react";
// import { Formik, useFormik } from 'formik';
import { searchFood } from '../../utils/API';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { searchExercise } from "../../utils/API";



export default function Component() {


    //Rendered States
    const [exercise, setExercise] = useState(false);
    const [cardio, setCardio] = useState(false);
    const [meal, setMeal] = useState(false);
   
   //states for exercise query
    const [lift, setLift] = useState('');
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    

const renderExercise = () => {
  if (exercise) {
    return(
        <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Lift(Bench,Pullups,etc.)"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value = {lift}
                onChange={handleLiftchange}
              />
              <Input
                placeholder="Weight"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value = {weight}
                onChange={handleWeightchange}
              />
                 <Input
                placeholder="Sets"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value = {sets}
                onChange={handleSetchange}
              />
              <Input
                placeholder="Reps"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value={reps}
                onChange={handleRepchange}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              onClick = {() => queryExercise()}>
              Add Lift
            </Button>
            {(liftResults === 'loading') ? (
                <CircularProgress isIndeterminate />
              ) : (liftResults === 'done') ? (
                <List textAlign={'left'} spacing={3}>
                  {liftData.lifts.map((lift, index) => <ExerciseResult lift={lift} index={index} />)}
                </List> 
              ) : (
                null
              )}
          </Box>
    )
  }
  else{
     
  }
}
const handleLiftchange = (event) => {
  const { value } = event.target;
    setLift(value);  
};

const handleWeightchange = (event) => {
  const { value } = event.target;
    setWeight(value);  
};

const handleSetchange = (event) => {
  const { value } = event.target;
    setSets(value);  
};

const handleRepchange = (event) => {
  const { value } = event.target;
    setReps(value);  
};
const handleExercise = () => {
    if(exercise===false){
        setExercise(true);
        renderExercise()
    }
    else{
        setExercise(false)
        renderExercise()
    }
}

const renderCardio = () => {
  if (cardio) {
    return (
        <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Workout(Running,Swimming,etc.)"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Distance"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                placeholder="Time"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Add Another Cardio
            </Button>
          </Box>
    )
  }
  else{
     
  }
}

const [liftResults, setLiftresults] = useState(null)
const [liftData, setLiftdata] = useState(null)
const [liftSearch, setLiftsearch] = useState('');

const queryExercise = (async () => {
setLiftsearch(lift + ' ' + weight +'lbs ' + sets + ' sets ' + reps + ' reps')
// console.log(lift + ' ' + weight +'lbs ' + sets + ' sets ' + reps + ' reps')
const response = await searchExercise(lift + ' ' + weight +'lbs ' + sets + ' sets ' + reps + ' reps');
setLiftdata(await response.json())
console.log(response.json)
})

const ExerciseResult =  ( {lifts, index } ) => {
  const [liftadded, setLiftadded] = useState(false); 
  const addLiftresult = (result) => {
      console.log(result)
      setLiftadded(prev => !prev)
    }
    return (
   
      <Box>
    

      <ListItem key={index}
      >
        <IconButton
          size='xs'
          mr={2}
          icon={liftadded ? <FaCheck /> : <FaPlus />}
          color={liftadded ? 'darkgreen' : 'gray'}
          bg={liftadded ? 'green' : 'white'}
          onClick={()=>addLiftresult(lifts)}
        />
        {lifts.lift_name}

      </ListItem>

      </Box>
    )
}
const handleCardio = () => {
    if(cardio===false){
        setCardio(true);
        renderCardio()
    }
    else{
        setCardio(false)
        renderCardio()
    }
}
const [results, setResults] = useState(null)
const [data, setData] = useState(null)
const [search, setSearch] = useState('');
const handleChange = (event) => {
  const { name, value } = event.target;

  if (name === 'query' ) {
    setSearch(value);
  }
};


  const searchNutrition =(async (values) => {
    // event.preventDefault();
    if(values==null)
    {
      return;
    }
    setResults('loading');
    const response = await searchFood(values);
    setData(await response.json())
    setResults('done');
  })

  //Formik Nutritioniix functions
  const SearchResult = ({ food, index }) => {
    const [added, setAdded] = useState(false) 
  const addResult = (result) => {
      console.log(result)
      setAdded(prev => !prev)
    }
    return (
   
      <Box>
    

      <ListItem key={index}
      >
        <IconButton
          size='xs'
          mr={2}
          icon={added ? <FaCheck /> : <FaPlus />}
          color={added ? 'darkgreen' : 'gray'}
          bg={added ? 'green' : 'white'}
          onClick={()=>addResult(food)}
        />
        {food.food_name}

      </ListItem>

      </Box>
    )
  }
const renderMeal = () => {
  if (meal) {
   return (
        <>
          <Center py={6}>
          <Stack spacing={4}>
            <Box>
                <Input 
                  id='query'
                  name='query'
                  type='query'
                  value= {search}
                  onChange={handleChange}
                />
                <Button my={6} onClick = {() =>searchNutrition(search)}>
                  Search Food
                </Button>
                </Box>         

              {(results === 'loading') ? (
                <CircularProgress isIndeterminate />
              ) : (results === 'done') ? (
                <List textAlign={'left'} spacing={3}>
                  {data.foods.map((food, index) => <SearchResult food={food} index={index} />)}
                </List> 
              ) : (
                null
              )}
           </Stack>
          </Center>     
        </>
      )  
    
  }
  else{
  }
}
const handleMeal = () => {
    if(meal===false){
        setMeal(true);
        renderMeal()
    }
    else{
        setMeal(false)
        renderMeal()
    }
}
//POST the POST
const [postdata, setPostdata]=useState('')
const textChange=(event)=>{
  const { value } = event.target;
    setPostdata(value);
  
}
const addPost=(text)=>{
  //ADD TO DB

  console.log(text);
}

//Rendered onto timeline page
  return (
    <Box bg={useColorModeValue("gray.50", "inherit")} p={10} alignItems="center">
      <Box  alignItems="center">
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 4 }}
          spacing={{ md: 6 }}
          align="center"
        >
            <Center>
            </Center>

          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
              alignItems="center"
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
                p={{ sm: 6 }}
              >

                <div>
                  <FormControl id="email" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Write a Post!
                    </FormLabel>
                    <Textarea
                      placeholder="Big Lift Today! New PR 225 Bench "
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: "sm" }}
                      onChange={textChange}
                    />
                  </FormControl>
                </div>

                <FormControl>
                  <Flex alignItems="center" mt={1}>
         
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                    >
                    Add Image
                    </Button>
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      colorScheme = "blue"
                      onClick={  () => handleExercise() } 
                    >
                    Add Exercise
                    </Button>
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      colorScheme = "blue"
                      onClick = { () => handleCardio() }
                    >
                    Add Cardio
                    </Button>
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      colorScheme = "blue"
                      onClick = { () => handleMeal() }
                    >
                    Add Meal
                    </Button>
                  </Flex>
                </FormControl>
                {renderExercise()}
                {renderCardio()}
                {renderMeal()}
              </Stack>
              <FormControl>
                  <Center>
              <Button
                      
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      verticalAlign = "center"
                      top = "25"
                      onClick={()=> addPost(postdata)}
                    >
                    Post
                    </Button>
                    </Center>
              </FormControl>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <Button
                  type="button"
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                >
                  Save
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          ></Box>
        </Box>
      </Box>

      </Box>
  );
}