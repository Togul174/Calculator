fun main(){
    while (true) {
        println("Введите первое число: ")
            var firstValue = readln()?.toDoubleOrNull()

        println("Введите второе число: ")
            var secondValue = readln()?.toDoubleOrNull()

        println("Введите оператор: ")
            var operator = readln().toString()

        if (firstValue == null || secondValue == null) {
            println("Необходимо ввести число")
        } else {
            var equals = calculate(firstValue, secondValue, operator)
            println("Равно: $equals")
        }
    }




}
fun calculate(firVal: Double, secVar: Double, op: String):Double{
    var result:Double =0.0
    if (op=="+"){
        result = firVal + secVar
    }
    else if (op=="-"){
        result = firVal - secVar
    }
    else if (op=="*"){
        result = firVal * secVar
    }
    else if (op=="/"){
        result = firVal / secVar
    }
    return result
}