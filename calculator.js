const currentoperand=document.querySelector("#currentdisplay")
const previousoperand=document.querySelector("#previousdisplay")
const numbers=document.querySelectorAll(".numbers")               //an array to store all digits of calculator
const operators=document.querySelectorAll(".operators")           //an array to store all operators of calculator
const equalButton=document.querySelector("#isequalto")
const acButton=document.querySelector("#AC")
const deleteButton=document.querySelector("#DEL")

let current='',previous='',currentOperator=''     //to keep record of the data in current and previous display and operator

function allClear()          
{current=''
previous=''
currentOperator=''
currentoperand.innerHTML=''
previousoperand.innerHTML='' 
}

function deleteprevious()
{
current=current.slice(0,-1)
updateCurrentDisplay()

}


function getDisplayNumber(num)   //to change the number in comma format(eg:-122,22.001)
{ 
  if(num==='') return ''
  
  let stringNumber=num.toString()
  let integerPlaces=parseFloat(stringNumber.split('.')[0])
  let decimalPlaces=stringNumber.split('.')[1]

  let integerNumber
  
  if(isNaN(integerPlaces))
  integerNumber=''
  else
  integerNumber=integerPlaces.toLocaleString('en')

  if(decimalPlaces!=null)
  return `${integerNumber}.${decimalPlaces}`  //appending before decimal digits with after decimal digits 
  else
  return integerNumber

}

function append(number)     //function to append digit to the current display everytime user clicks a button
{ 
if(number==='.' && current.includes('.'))
return
current=current.toString()+number.toString()
}

function updateCurrentDisplay()
{
currentoperand.innerHTML=getDisplayNumber(current)
}

function updatePreviousDisplay( )
{
  if(previous==='') 
  return

  previousoperand.innerHTML=getDisplayNumber(previous)+currentOperator
  current=''
  updateCurrentDisplay()

}

function equalTO()   //calculate the result of current and previous accordingly
{
   if(previous==='' || current==='')
   return 

   
   let result=0
   current=parseFloat(current)
   previous=parseFloat(previous)

   switch(currentOperator)
   {
     case '+' : result=previous+current
     break
     case '-' : result=previous-current
     break
     case '÷' : result=previous/current
     break
     case '×' : result=previous*current
     break
   }
 current=result.toString()
 updateCurrentDisplay()
 previous=''
 previousoperand.innerHTML =''
 currentOperator=''
}

function compute(operator)   
{ 
    if(  current==='' )
     return 
    
     if( previous==='')      
    {previous= current
    console.log(current)}

    else
    {
      let result=0
      current=parseFloat(current)
      previous=parseFloat(previous)

      switch(currentOperator)
      {
        case '+' : result=previous+current
        break
        case '-' : result=previous-current
        break
        case '÷' : result=previous/current
        break
        case '×' : result=previous*current
        break
      }
    previous=result.toString()
    
  }
currentOperator=operator

}
 
numbers.forEach(number => {
    number.addEventListener("click",() => {
        append(number.innerHTML)
        updateCurrentDisplay()
    })
})
operators.forEach(operator => {
    operator.addEventListener("click",() => {
      compute(operator.innerHTML)
      updatePreviousDisplay()
    })
})
equalButton.addEventListener("click",equalTO)
acButton.addEventListener("click",allClear)
deleteButton.addEventListener("click",deleteprevious)