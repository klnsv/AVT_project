# Analysis Routes Documentation


1. ### To get the details of all the shifts within a given timeframe
    **Function**: getShift  

    **URL**: `http://localhost:3000/analysis/shiftDetails`  

    **req.body**:
    ```json
    {
        "start_date": "2024-10-1",
        "end_date": "2024-10-10"
    }
    ```

    **response**:
    1. Success:
        ```json
        {
            "result": [
                {
                    "target": 150,
                    "permanent_entry": {
                        "id": 4,
                        "MachName": "MachB",
                        "OperatorID": 1,
                        "Shift": 3,
                        "Date": "2024-10-02",
                        "IdleTime": 0,
                        "NonWorking": 0,
                        "MachStatus": "Active",
                        "Count": 3,
                        "OperationType": "Welding",
                        "StartTime": "00:00:00",
                        "EndTime": "08:00:00",
                        "efficiency": 0.02,
                        "createdAt": "2024-10-13T14:18:17.000Z",
                        "updatedAt": "2024-10-24T21:51:08.000Z"
                    }
                },
                {
                    "target": 150,
                    "permanent_entry": {
                        "id": 3,
                        "MachName": "MachC",
                        "OperatorID": 1,
                        "Shift": 4,
                        "Date": "2024-10-02",
                        "IdleTime": 0,
                        "NonWorking": 0,
                        "MachStatus": "Active",
                        "Count": 6,
                        "OperationType": "Welding",
                        "StartTime": "00:00:00",
                        "EndTime": "08:00:00",
                        "efficiency": 0.04,
                        "createdAt": "2024-10-12T13:07:17.000Z",
                        "updatedAt": "2024-10-24T21:51:08.000Z"
                    }
                },
                {
                    "target": 150,
                    "permanent_entry": {
                        "id": 16,
                        "MachName": "MachC",
                        "OperatorID": 2,
                        "Shift": 5,
                        "Date": "2024-10-02",
                        "IdleTime": null,
                        "NonWorking": null,
                        "MachStatus": "Active",
                        "Count": 0,
                        "OperationType": "Welding",
                        "StartTime": "00:00:00",
                        "EndTime": "08:00:00",
                        "efficiency": null,
                        "createdAt": "2024-10-12T17:13:40.000Z",
                        "updatedAt": "2024-10-24T21:51:08.000Z"
                    }
                }
            ]
        }
        ```
    2. Failure:
        ```json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```
2. ### To get the details of all the shifts corresponding to a particular employee

    **Function**: getShift  
    
    **URL**: `http://localhost:3000/analysis/employeeDetails` 

    **req.body**:
    ```json
    {
        "employee_id":1,
        "start_date": "2024-10-1",
        "end_date": "2024-10-10"
    }
    ```