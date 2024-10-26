# Shift Routes Documentation


1. ### To add a SHIFT
    **Function**: addShift  

    **Method**: POST

    **URL**: `http://localhost:3000/shift/add`  

    **req.body**:
    ```json
    {
        "start_time":"00:00:00",
        "end_time":"09:00:00",
        "target":50,
        "operation_type":"Cutting",
        "mach_id":"Mach A",
        "shift_duration":9,
        "shift_date":"2024-10-10",
        "employee_id":3
    }
    ```

    **response**:
    1. Success:
        ```json
        {"msg":"Shift has been created successfully","shift_id":5,"shift_date":"2024-10-10"}
        ```
    2. Failure:
        ```json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```
    3. Shift already existing for a current employee with the end_time of the existing shift greater than the start_time given in the req.body :
        ```json
        {"msg":"Shift on ${shift_date} for the given employee_id ${employee_id} has already been created! The shift_id is ${existing_shift.shift_id}"}

2. ### To delete a SHIFT
    **Function**: deleteShift  

    **Method**: DELETE

    **URL**: `http://localhost:3000/shift/delete/1`  

    **response**:
    1. Success:
        ```json
        {"msg":"The selected shift has been deleted!"}
        ```
    2. Failure:
        ```json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```
    3. If the shift has already begun at the time of the deletion:
        ```json
        {"msg":"Sorry cannot delete the shift after it has begun! The shift_id is ${to_destroy_shift.shift_id}"}

3. ### To UPDATE a SHIFT
    **Function**: updateShift  

    **Method**: PUT

    **URL**: `http://localhost:3000/shift/update/1`  

    **req.body**:
    ```json
    {
        "start_time":"00:00:00",
        "end_time":"09:00:00",
        "target":50,
        "operation_type":"Cutting",
        "mach_id":"Mach A",
        "shift_duration":9,
        "shift_date":"2024-10-10",
        "employee_id":3
    }
    ```

    **response**:
    1. Success:
        ```json
        {"msg":"The shift with the shift_id 1 has been updated!!",
        "shift":{
            "shift_id": 1,
            "start_time":"00:00:00",
            "end_time":"09:00:00",
            "target":50,
            "operation_type":"Cutting",
            "mach_id":"Mach A",
            "shift_duration":9,
            "shift_date":"2024-10-10",
            "employee_id":3
        }
        }
        ```
    2. Failure:
        ```json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```
    3. If the shift can't be found:
        ```json
        {"msg":"The shift with the given shift_id ${shift_id} cannot be found!!"}

4. ### To get Shift Details
    **Function**: getShiftDetails  

    **Method**: GET

    **URL**: `http://localhost:3000/shift/get/3`  


    **response**:
    1. Success:
        ```json
        {
        "shift_id": 3,
        "start_time": "00:00:00",
        "end_time": "08:00:00",
        "target": 150,
        "operation_type": "Welding",
        "mach_id": "MachB",
        "shift_duration": 8,
        "shift_date": "2024-10-02",
        "employee_id": 1
        }
        ```
    2. Failure:
        ```json
        {
            "msg": "Error will be displayed accordingly"
        }
        ```
    3. If the shift can't be found:
        ```json
        {"msg":"The shift with the given shift_id ${shift_id} cannot be found!!"}
