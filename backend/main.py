from flask import Flask
from flask import request
from flask import jsonify
from flask import Response
from waitress import serve
from code import timeDict
app = Flask(__name__)


def createRoute(elem):
    return {'startTime': -1,
            'stopTime': -1,
            'startPoint': elem['src'],
            'stopPoint': elem['trg'],
            'buses': elem['buses'],
            'passengerCount': elem['passengers'],
            'routeId': elem['id']
            }


def transformAlgorithmData(timeDict):
    routes = {}
    for key, arr in timeDict.items():
        for elem in arr:
            if elem['isStart'] is True:
                routes[elem['id']] = createRoute(elem)
                routes[elem['id']]['startTime'] = key
            else:
                routes[elem['id']]['stopTime'] = key
                routes[elem['id']]['id'] = key
    return routes


def transformSchedule(routes, startMinute=0):
    res = {}
    for key, elem in routes.items():
        if elem['stopTime'] > startMinute:
            res[key] = elem
    return res


schedule = {}


def parseBaseArgs(request):
    routeId = int(request.args.get('routeId'))
    startTime = int(request.args.get('startTime'))
    stopTime = int(request.args.get('stopTime'))
    startPoint = int(request.args.get('startPoint'))
    stopPoint = int(request.args.get('stopPoint'))
    return routeId, startTime, stopTime, startPoint, stopPoint


@app.errorhandler(500)
def handel_500(error):
    return Response(status=500)


@app.errorhandler(404)
def handel_404(error):
    return Response(status=404)


@app.errorhandler(400)
def handel_400(error):
    return Response(status=400)


@app.route('/routes/new', methods=['POST'])
def routeNew():
    routeId, startTime, stopTime, startPoint, stopPoint = parseBaseArgs(request)
    passengers = int(request.args.get('passengers'))
    busesNumbers = request.args.get('buses')
    busesNumbers = [int(val) for val in busesNumbers.split(',')]
    if routeId in schedule:
        return Response(status=400)
    else:
        schedule[routeId] = {'routeId': routeId, 'startTime': startTime, 'stopTime': stopTime,
                             'startPoint': startPoint, 'stopPoint': stopPoint, 'passengerCount': passengers,
                             'buses': busesNumbers}
    return Response(status=200)


@app.route('/routes/update', methods=['PUT'])
def routeUpdate():
    routeId, startTime, stopTime, startPoint, stopPoint = parseBaseArgs(request)
    if routeId in schedule:
        schedule[routeId].update({'routeId': routeId, 'startTime': startTime, 'stopTime': stopTime,
                                  'startPoint': startPoint, 'stopPoint': stopPoint})
    else:
        return Response(status=400)
    return Response(status=200)


@app.route('/routes/deleteBus', methods=['DELETE'])
def routeDeleteBus():
    routeId = request.args.get('routeId')
    busId = request.args.get('busId')
    if routeId in schedule:
        try:
            schedule[routeId]['buses'].remove(int(busId))
        except ValueError as e:
            return Response(status=400)
    else:
        return Response(status=400)

    return Response(status=200)


@app.route('/routes/addBus', methods=['PUT'])
def routeAddBus():
    routeId = request.args.get('routeId')
    busId = request.args.get('busId')
    if routeId in schedule:
        schedule[routeId]['buses'].append(int(busId))
    else:
        return Response(status=400)

    return Response(status=200)


@app.route('/schedule', methods=['GET'])
def getDaySchedule():
    if not schedule:
        return Response(status=400)
    else:
        return jsonify(
            list(schedule.values())
        )


@app.route('/fromMinute', methods=['PUT'])
def getCurrentSchedule():
    global schedule
    startTime = request.args.get('minute')
    schedule = transformSchedule(schedule, startMinute=int(startTime))
    return Response(status=200)


if __name__ == "__main__":
    schedule = transformAlgorithmData(timeDict)
    serve(app, host="0.0.0.0", port=5000)
