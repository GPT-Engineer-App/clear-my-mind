import { useState } from 'react';
import { Box, Button, Flex, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (!inputTitle.trim()) {
      toast({
        title: 'Error',
        description: "Title can't be empty",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      title: inputTitle,
      description: inputDescription,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputTitle('');
    setInputDescription('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Flex>
          <Input placeholder="Title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
          <Input ml={2} placeholder="Description (optional)" value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
          <Button ml={2} colorScheme="blue" onClick={addTask}><FaPlus /></Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {tasks.map(task => (
            <Flex key={task.id} p={2} borderWidth="1px" borderRadius="lg" alignItems="center" justifyContent="space-between">
              <Box>
                <Text as={task.completed ? 's' : ''}>{task.title}</Text>
                <Text fontSize="sm">{task.description}</Text>
              </Box>
              <Flex>
                <Button onClick={() => toggleComplete(task.id)} colorScheme={task.completed ? "green" : "gray"}><FaCheck /></Button>
                <Button ml={2} onClick={() => deleteTask(task.id)} colorScheme="red"><FaTrash /></Button>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;