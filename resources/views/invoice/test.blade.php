<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            text-align: center;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px;
        }

        .box-container {
            display: flex;
            width: 100%; /* Adjust to match table width */
            margin-bottom: -1px; /* Adjust to overlap with table border */
        }

        .box {
            border: 1px solid black; /* Set border to 1px for consistency */
            padding: 10px;
            width: 100%; /* Each box takes up 50% of the container width */
            box-sizing: border-box; /* Includes padding and border in the element's total width and height */
        }

        .box:first-child {
            border-right: none; /* Remove right border from Box 1 */
        }

        .table-container {
            border: 1px solid black; /* Set border to 1px for consistency */
            border-top: none; /* Remove top border to merge with box's bottom border */
            width: 100%; /* Same width as the box-container */
            box-sizing: border-box; /* Ensure the border does not affect the width */
        }

        .table {
            width: 100%;
            border-collapse: collapse; /* Collapse borders to avoid double borders */
        }

        .table th, .table td {
            border-right: 1px solid black; /* Vertical borders between cells */
            padding: 8px;
        }

        .table th:last-child, .table td:last-child {
            border-right: none; /* Remove border from the last column */
        }

        .thead th {
            border-bottom: 1px solid black; /* Bottom border for header cells */
        }

        .heading {
            color: red;
            margin-bottom: 20px; /* Space between the heading and boxes */
        }

        .left {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        p {
            margin: 0;
        }

        .right {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
        }
    </style>
</head>
<body>
    <h1 class="heading">INVOICE</h1>
    <div class="container">
        <div class="box-container">
            <div class="box">
                <div class="left">
                    <p>Gst Pro</p>
                    <p>HafyMish Technologies</p>
                    <p>Banglore - 400605</p>
                    <p>GST - 123456GGGG87</p>
                </div>
            </div>
            <div class="box">
                <div class="right">
                    <p>Gst Pro</p>
                    <p>HafyMish Technologies</p>
                    <p>Banglore - 400605</p>
                    <p>GST - 123456GGGG87</p>
                </div>
            </div>
        </div>
        <div class="table-container">
            <table class="table">
                <thead class="thead">
                    <tr>
                        <th style="width: 7%">SL</th>
                        <th style="width: 65%;">Product Name</th>
                        <th style="width: 7%">Gst%</th>
                        <th style="width: 7%">Rate</th>
                        <th style="width: 7%">Qty</th>
                        <th style="width: 7%">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>abc name</td>
                        <td>12345678</td>
                        <td>44</td>
                        <td>99</td>
                        <td>5000</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>abc name</td>
                        <td>12345678</td>
                        <td>44</td>
                        <td>99</td>
                        <td>5000</td>
                    </tr>
                    <tr style="height: 50vh;">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr style="border-top: 1px solid black;">
                        <td></td>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>90000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>