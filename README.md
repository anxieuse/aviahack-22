## Формат входных данных
roads.csv - файл с данными о дорогах. Содержит следующие поля:
* id - уникальный идентификатор дороги
* src - идентификатор начальной точки
* trg - идентификатор конечной точки
* dist - расстояние между точками (в минутах)

flight.csv - файл с данными о рейсах. Содержит следующие поля:
* id - уникальный идентификатор рейса
* type - тип рейса (вылет/прилет)
* date - дата вылета/прилета
* time - время вылета/прилета
* point_id - идентификатор посадочной точки
* gate_id - идентификатор ворот
* passengers - количество пассажиров

buses.csv:
* bus_id - уникальный идентификатор автобуса
* capacity - вместимость автобуса
* point_id - идентификатор посадочной точки

## Формат первичных выходных данных
solution.csv:
* bus_id - уникальный идентификатор автобуса
* flight_id - уникальный идентификатор рейса
* passengers - количество пассажиров
* task_type - тип задачи (to_load/to_unload/loading/unloading)
* src, trg - идентификаторы начальной и конечной точки
* start_time, end_time - время начала и конца задачи
  
flights-new.csv:
* id - уникальный идентификатор рейса
* type - тип рейса (вылет/прилет)
* point_id - идентификатор посадочной точки
* gate_id - идентификатор ворот
* passengers - количество пассажиров
* buses - список автобусов, которые будут использоваться для перевозки пассажиров
* complete_time - время завершения рейса

## Формат преобразованных выходных данных для бэкенда
```python

starts = {
    {100: {'isStart': True,
    'routeId': 100,
    'buses': [5, 6, 10],
    'startPoint': 100,
    'stopPoint': 150,
    'passengers': 200}},

    {200: {'isStart': True,
    'routeId': 100,
    'buses': [5, 6, 10],
    'startPoint': 100,
    'stopPoint': 150,
    'passengers': 200}},

    ...
}

stops = {
    {100: {'isStart': False,
    'routeId': 100,
    'buses': [5, 6, 10],
    'startPoint': 100,
    'stopPoint': 150,
    'passengers': 200}},

    {200: {'isStart': False,
    'routeId': 100,
    'buses': [5, 6, 10],
    'startPoint': 100,
    'stopPoint': 150,
    'passengers': 200}},

    ...
}

TimeDict = {
    45: [starts[0], stops[1], ...],
    70: [stops[0], starts[1], ...],
    ...
}
```

## Как запускать
1. Скачать репозиторий:
```bash
git clone https://github.com/anxieuse/aviahack-22
```
2. Установить зависимости:
```bash
pip install -r requirements.txt
```
3. Запустить solve.py на одном из тестов:
```bash
python3 ./task/scripts/solve.py --i ./task/tests/sample-formatted -o ./task/tests/sample-formatted
```
4. Посмотреть результаты в папке ./task/tests/sample-formatted/solution_.
5. Сгенерировать код для бэкенда:
```bash
python3 ./task/scripts/code-gen.py --i ./task/tests/sample-formatted/solution_ -o ./task/tests/sample-formatted/solution_
```

## TO-DO
* Реализовать поддержку следующих запросов:
  * Добавить/удалить автобус/рейс
  * Переназначить автобус для рейса
  * Изменить время вылета/прилета рейса
  * Изменить время исполнения задачи
* Написать генератор тестов