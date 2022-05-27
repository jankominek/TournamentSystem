export const createTournamentValidator = (data, types) => {
    console.log("ASDASD : ", data["name"])
    console.log(types)
    let message = "";
    types.forEach( (elementType) => {
        if(elementType.type === "text"){
            const res = textValidation(data[elementType.name]);
            if(!res){
                message = "wrong text format in "+ elementType.name;
            }
            if(data[elementType.name]===""){
                message = "Fields cannot be empty";
            }
            console.log(data[elementType.name], true)
        }
        if(elementType.type === "date"){
            const res = dateValidation(data[elementType.name]);
            if(!res){
                message = "wrong date format in "+ elementType.name;
            }
            if(data[elementType.name]===""){
                message = "Fields cannot be empty";
            }
            console.log(data[elementType.name], true)
        }
        if(elementType.type === "number"){
            const res = numberValidation(data[elementType.name]);
            if(!res){
                message = "Wrong number in field " + elementType.name ;
            }
            if(data[elementType.name]===""){
                message = "Fields cannot be empty";
            }
            console.log(data[elementType.name], true)
        }
    })

    return message;
    
}

export const textValidation = (text) => {
    const regex = new RegExp("^[a-zA-Z ]*$");
    return regex.test(text);
}

export const numberValidation = (number) => {
    const regex = new RegExp("^[0-9]*$");
    if(regex.test(number)){
        if(number >= 0){
            return true;
        }
        return false;
    }
    return false;
}

export const dateValidation = (date) => {
    const regex = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$");
    return regex.test(date);
}