# Analysis Routes Documentation


1. ### To get the details of all the shifts within a given timeframe
    **Function**: getShift  

    **Method**: GET

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
    
    **Method**: GET

    **URL**: `http://localhost:3000/analysis/employeeDetails` 

    **req.body**:
    ```json
    {
        "employee_id":1,
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

3. ### To get the details of all the shifts corresponding to given shift_ids

    **Function**: getShifts  
    
    **Method**: GET

    **URL**: `http://localhost:3000/analysis/getShifts` 

    **req.body**:
    ```json
    {
        "shift_ids":[1,2,3,4,5]
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
                    "Date": "2024-10-24",
                    "IdleTime": 0,
                    "NonWorking": 7.6667,
                    "MachStatus": "Active",
                    "Count": 12,
                    "OperationType": "Welding",
                    "StartTime": "08:25:00",
                    "EndTime": "08:35:00",
                    "efficiency": 0.08,
                    "createdAt": "2024-10-24T21:51:17.000Z",
                    "updatedAt": "2024-10-24T21:51:17.000Z"
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
4. ### To get the details of all the shifts based on isTargetMet Column

    **Function**: filterByMet  
    
    **Method**: GET

    **URL**: `http://localhost:3000/analysis/filterByTargetMet` 

    **response**:
    1. Success:
        ```json
        {
            "targetsMetShifts": [
                {
                    "id": 5,
                    "MachName": "Mach B",
                    "OperatorID": 3,
                    "Shift": 12,
                    "Date": "2024-10-24",
                    "IdleTime": 0,
                    "NonWorking": -101180,
                    "MachStatus": "Active",
                    "Count": 2428650,
                    "OperationType": "Cutting",
                    "StartTime": "20:39:59",
                    "EndTime": "20:48:44",
                    "efficiency": 80955,
                    "createdAt": "2024-10-24T21:54:17.000Z",
                    "updatedAt": "2024-10-24T21:54:17.000Z"
                }
            ],
            "notMetShifts": [
                {
                    "id": 3,
                    "MachName": "MachC",
                    "OperatorID": 1,
                    "Shift": 4,
                    "Date": "2024-10-24",
                    "IdleTime": 0,
                    "NonWorking": 7.6667,
                    "MachStatus": "Active",
                    "Count": 12,
                    "OperationType": "Welding",
                    "StartTime": "08:25:00",
                    "EndTime": "08:35:00",
                    "efficiency": 0.08,
                    "createdAt": "2024-10-24T21:54:17.000Z",
                    "updatedAt": "2024-10-24T21:54:17.000Z"
                },
                {
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
            ]
        }
        ```
    2. Failure:
        ```json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```
        
5. ### To get the details of all the shifts corresponding to given shift_ids

    **Function**: filterByTarget  
    
    **Method**: GET
    
    **URL**: `http://localhost:3000/analysis/filterByTarget` 

    **req.body**:
    ```json
    {
        "target":100,
        "method":"Greater"
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
                        "Date": "2024-10-24",
                        "IdleTime": 0,
                        "NonWorking": 7.6667,
                        "MachStatus": "Active",
                        "Count": 12,
                        "OperationType": "Welding",
                        "StartTime": "08:25:00",
                        "EndTime": "08:35:00",
                        "efficiency": 0.08,
                        "createdAt": "2024-10-24T21:58:17.000Z",
                        "updatedAt": "2024-10-24T21:58:17.000Z"
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

        If the method is not specified properly:
        ``` json
        {
            "msg":"Enter some valid method! Available methods are 'Greater' and 'Lesser'"
        }
        ```
        Any other errors
        ``` json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```        

6. ### To get cumulative details of all the shifts in a day

    **Function**: fulldayShifts  
    
    **Method**: GET
    
    **URL**: `http://localhost:3000/analysis/fulldayAnalysis` 

    **req.body**:
    ```json
    {
        "date":"2024-10-21"
    }
    ```

    **response**:
    1. Success:
        ```json
        {
            "proximity_sum": 45,
            "target": 31,
            "absentNames": [],
            "notPresentIDS": [],
            "notPresentRFIDS": [],
            "presentNames": [
                "Sample employee"
            ],
            "presentRFIDS": [
                "RFID007"
            ],
            "presentEmployeeDetails": [
                {
                    "employee_id": 1,
                    "employee_name": "Sample employee",
                    "rfid": "RFID007",
                    "password": "wasd",
                    "total_idle_hours": 0.483333,
                    "total_working_hours": 9.83333,
                    "total_count": null,
                    "total_efficiency": 0.28,
                    "assigned_shift": 4,
                    "total_targets_met": 7
                }
            ],
            "presentMachs": [
                "Mach A"
            ],
            "presentMachDetails": [
                {
                    "MachName": "Mach A",
                    "target": 30,
                    "count": 45,
                    "efficiency": 1.5,
                    "operatorID": 1,
                    "idleTime": 5,
                    "nonWorking": 95
                }
            ],
            "notPresentMachines": [],
            "idleTime": 5,
            "nonWorking": 95,
            "absentEmployeeDetails": []
        }
        ```
    2. Failure:  

        Any other errors
        ``` json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```        

7. ### To get cumulative details of all the shifts for each day in a given custom timeframe

    **Function**: getDayAnalysis  
    
    **Method**: GET
    
    **URL**: `http://localhost:3000/analysis/customDayAnalysis` 

    **req.body**:
    ```json
    {
        "start_date":"2024-10-21",
        "end_date":"2024-10-30"
    }
    ```

    **response**:
    1. Success:
        ```json
        {
            "msg": {
                "2024-10-21": {
                    "proximity_sum": 45,
                    "target": 31,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [
                        "Sample employee"
                    ],
                    "presentRFIDS": [
                        "RFID007"
                    ],
                    "presentEmployeeDetails": [
                        {
                            "employee_id": 1,
                            "employee_name": "Sample employee",
                            "rfid": "RFID007",
                            "password": "wasd",
                            "total_idle_hours": 0.483333,
                            "total_working_hours": 9.83333,
                            "total_count": null,
                            "total_efficiency": 0.28,
                            "assigned_shift": 4,
                            "total_targets_met": 7
                        }
                    ],
                    "presentMachs": [
                        "Mach A"
                    ],
                    "presentMachDetails": [
                        {
                            "MachName": "Mach A",
                            "target": 30,
                            "count": 45,
                            "efficiency": 1.5,
                            "operatorID": 1,
                            "idleTime": 5,
                            "nonWorking": 95
                        }
                    ],
                    "notPresentMachines": [],
                    "idleTime": 5,
                    "nonWorking": 95,
                    "absentEmployeeDetails": []
                },
                "2024-10-22": {
                    "proximity_sum": 17,
                    "target": 110,
                    "absentNames": [
                        "Sample employee"
                    ],
                    "notPresentIDS": [
                        1
                    ],
                    "notPresentRFIDS": [
                        "RFID007"
                    ],
                    "presentNames": [
                        "Sample 2"
                    ],
                    "presentRFIDS": [
                        "RFID001"
                    ],
                    "presentEmployeeDetails": [
                        {
                            "employee_id": 2,
                            "employee_name": "Sample 2",
                            "rfid": "RFID001",
                            "password": "omasd",
                            "total_idle_hours": 0.283333,
                            "total_working_hours": 8.41667,
                            "total_count": null,
                            "total_efficiency": 0.28,
                            "assigned_shift": 3,
                            "total_targets_met": 0
                        }
                    ],
                    "presentMachs": [
                        "Mach A"
                    ],
                    "presentMachDetails": [
                        {
                            "MachName": "Mach A",
                            "target": 60,
                            "count": 17,
                            "efficiency": 0.2833,
                            "operatorID": 2,
                            "idleTime": 12,
                            "nonWorking": 120
                        }
                    ],
                    "notPresentMachines": [
                        "Mach B"
                    ],
                    "idleTime": 12,
                    "nonWorking": 120,
                    "absentEmployeeDetails": [
                        {
                            "employee_id": 1,
                            "employee_name": "Sample employee",
                            "rfid": "RFID007",
                            "password": "wasd",
                            "total_idle_hours": 0.483333,
                            "total_working_hours": 9.83333,
                            "total_count": null,
                            "total_efficiency": 0.28,
                            "assigned_shift": 4,
                            "total_targets_met": 7
                        }
                    ]
                },
                "2024-10-23": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-24": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-25": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-26": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-27": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-28": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-29": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                },
                "2024-10-30": {
                    "proximity_sum": null,
                    "target": null,
                    "absentNames": [],
                    "notPresentIDS": [],
                    "notPresentRFIDS": [],
                    "presentNames": [],
                    "presentRFIDS": [],
                    "presentEmployeeDetails": [],
                    "presentMachs": [],
                    "presentMachDetails": [],
                    "notPresentMachines": [],
                    "idleTime": null,
                    "nonWorking": null,
                    "absentEmployeeDetails": []
                }
            }
        }
        ```
    2. Failure:  
        Any other errors
        ``` json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```      