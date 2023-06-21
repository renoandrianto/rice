# Rice Delivery App

To give you a taste of what it would be like to work at Rice Robotics, we would like you to build a simple delivery app for our Rice delivery robot. Please complete this assignment by the deadline agreed on and also tell us the total amount of time you have spent on this app.

### Scenario

John would like to deliver some flowers to Mary using the Rice delivery robot. The robot can be controlled by the app on the small screen on the back of the robot and here's the flow:

1. John presses a button on the app to open the lid of robot
1. John puts the flowers into the container of the robot
1. John presses a button on the app to close the lid of the robot
1. John selects a destination to deliver the flowers
1. Robot navigates to the selected destination
1. After reaching the destination, lid of the robot will open automatically
1. Mary picks up the flowers from the container of the robot
1. Mary presses a button on the app to close the lid of the robot
1. After the lid closes, the robot returns back to the home location
1. After reaching home, robot will be ready for the next delivery

### Task

An empty React project and mock robot API server is provided. The mock robot server simulates a simple Rice delivery robot which can open/close lid and navigate to a waypoint. A list of available waypoints and robot status can also be requested from the mock robot server. Refer to the documentation of the mock robot server below.

You need to create a delivery app based on the scenario starting with the empty React project.

### Requirements

- Execute the flow as described in the scenario
- Call APIs on mock robot server accordingly
- Work well on a 1024 x 600 sized display
- Use functional components and hooks
- Write appropriate git commits
- Use of TypeScript is optional but encouraged

### Hints

- Don't hesitate to ask if you need any clarifications
- Be mindful of the different edge cases and user interactions
- Get creative! You can add transitions, sound effects, voice and other elements to enhance the user experience
- Make use of the robot status information and you may also extend the mock robot server

## Getting started

```
$ yarn        ## Install deps
$ yarn start  ## Run development & API server
```

## Mock Robot Server

#### `GET /api/status`

Get current status information of the robot

- Response
    - Status `200`
    - Body (object)
        - `charge`: number (current battery level in percentage)
        - `charging`: boolean (indicate whether the robot is charging)
        - `online`: boolean (indicate whether the robot is online)
        - `position`: object
            - `x` number (x coordinate of robot's current location)
            - `y` number (y coordinate of robot's current location)
            - `theta` number (orientation of the robot in degrees)
        - `lid`: string (`open`, `close`)
        - `navigationState`: string (`idle`, `active`)

Sample response

```json
{
    "charge": 70,
    "charging": false,
    "online": true,
    "position": { "x": 0, "y": 0, "theta": 0 },
    "lid": "close",
    "navigationState": "idle"
}
```

#### `GET /api/map/waypoint`

Get a list of waypoints on the RiceMap

- Response
    - Status `200`
    - Body (object)
        - `$id` object
            - `name`: string
            - `coord`: array[number] (`[x, y, theta]`)

Sample response

```json
{
    "ADESqX9j_h6ujP4n": {
        "name": "Home",
        "coord": [0, 0, 0],
    },
    "TCmL6LDD_2Q_-PVV": {
        "name": "Destination A",
        "coord": [1, 1, 0],
    },
    "D8HeuxtyNYw2AjAL": {
        "name": "Destination B",
        "coordinate": [2, 2, 0],
    }
}
```

#### `POST /api/lid`

Open or close the lid of the robot

- Request
    - Body (object)
        - `lid`: string (`open`, `close`)
- Response
    - Status `200`
    - Body (empty object)

#### `POST /api/nav/goal`

Set navigation goal for the robot, this API blocks until navigation has either succeeded or failed

- Request
    - Body (object)
        - `waypoint`: string (waypoint ID)
- Response
    - Status `200`
    - Body (object)
        - `result`: string (`success`, `cancelled`)

#### `POST /api/nav/cancel`

Cancel on-going navigation task

- Response
    - Status `200`
    - Body (empty object)
