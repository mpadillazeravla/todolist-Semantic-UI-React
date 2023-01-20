import {Select, Input, Button, Grid, Header, Icon, HeaderContent} from "semantic-ui-react"
import { useState } from "react";
import {v4 as uuidv4} from "uuid";

const options = [
    {key:"deporte" , text:"Deporte", value:"deporte"},
    {key:"casa" , text:"Casa", value:"casa"},
    {key:"trabajo" , text:"Trabajo", value:"trabajo"},
    {key:"otra" , text:"Otra", value:"otra"},
];

export default function InputTask(props) {
    
    // EL SET TASK LO PONEMOS PARA PODER SETEAR EL ID, EL NOMBRE Y LA CATEGORIA
    const [task,setTask] = useState({
        idTask:"",
        taskName:"",
        categoryTask:""
    });
    const [error, setError] = useState(false);

    // asi pasamos por props createTask de app.js , haciendole destructuring
    const {createTask} = props;

    // FUNCION PARA COGER VALOR DEL INPUT
    // Aqui le decimos que lo que entre en e.target.value (los datos del evento e)
    // lo setee en TASK poniendo target.value como task.name y manteniendo lo que hay en value
    const onChangeTask = (e) => {
        // console.log(e.target.value);
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitTask = (e) => {

        // esto sirve para no recargar pagina
        e.preventDefault();

        // validacion
        // trim sirve para quitar espacios
        // si el nombre de la tarea sin espacios es vacio, ponemos error en true
        if(task.taskName.trim() === "" ){
            setError(true);
            return;
        }

        // eliminar el mensaje previo. Eliminamos el mensaje de error si ha salido previamente 
        // para que no quede para siempre una vez que una tarea ha dado error
        setError(false);

        // asignar ID
        task.idTask = uuidv4();

        // crear la tarea
        createTask(task)

        // limpiar los inputs del formulario
        setTask({
            idTask:"",
            taskName:"",
            categoryTask:""
        })
    }

    // FUNCION PARA COGER VALOR DEL SELECT Y MOSTRARLO EN EL PROPIO SELECT
    const onChangeCategoryTask = (e, data) => {
        console.log(data.value)
        setTask({
            ...task,
            [data.name]: data.value
        })
    }

    return (<>
        <Grid centered columns={2}>
            <Input type="text" action>
                <Input 
                size="small" 
                icon="add" 
                placeholder="Escribe tu tarea..." 
                iconPosition="left" 
                name="taskName"
                value={task.taskName}
                onChange={onChangeTask}
                />

                <Select 
                compact options={options} 
                className="select-form-task" 
                name="categoryTask" 
                placeholder="Categoria"
                value={task.categoryTask}
                onChange={onChangeCategoryTask}
                />

                <Button type="submit" color="violet" onClick={onSubmitTask} >Añadir tarea</Button>
            
            </Input>
        </Grid>
        {error && (
            <Grid centered>
                <Header as="h4" color="red" className="alert-error-form">
                    <Icon name="close"/>
                    <HeaderContent>La tarea es obligatoria</HeaderContent>
                    <Icon name="close"/>
                </Header>

            </Grid>
        )}

    </>)
    
};
