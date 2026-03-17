export function statusColor(status:string){

switch(status){

case "new":
return "orange"

case "paid":
return "green"

case "processing":
return "blue"

case "shipped":
return "purple"

case "completed":
return "black"

case "cancelled":
return "red"

default:
return "gray"

}

}