<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #000;
        }
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            border: 1px solid #000;
        }
        .invoice-box h4 {
            margin: 0;
            font-size: 18px;
        }
        .invoice-box h6 {
            margin: 0;
            font-size: 14px;
        }
        .invoice-box table {
            width: 100%;
            border-collapse: collapse;
        }
        .invoice-box table, .invoice-box th, .invoice-box td {
            border: 1px solid black;
        }
        .invoice-box th, .invoice-box td {
            padding: 8px;
            text-align: left;
        }
        .invoice-box .header, .invoice-box .footer {
            text-align: center;
            margin-bottom: 20px;
        }
        .invoice-box .header td {
            border: none;
            padding: 0;
        }
        .invoice-box .information td {
            border: none;
            padding: 0;
        }
        .invoice-box .totals td {
            border: none;
            text-align: right;
            padding: 5px 0;
        }
        .invoice-box .totals td:last-child {
            width: 100px;
            border-bottom: 1px solid #000;
        }
        .invoice-box .round-off td {
            border: none;
            text-align: right;
            padding: 5px 0;
        }
        .invoice-box .round-off td:last-child {
            border-bottom: 2px solid #000;
        }
        .text-end {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
    </style>
</head>
<body>
    <h4 style="text-align: center">INVOICE</h4>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            {{-- <tr class="header">
                <td colspan="6">
                    <h4>INVOICE</h4>
                    <h6>ORIGINAL</h6>
                </td>
            </tr> --}}

            <tr class="information">
                <td colspan="3">
                    <strong>{{$profile->name}}</strong><br>
                    HafyMish Technologies<br>
                    {{$profile->state}} - {{$profile->pincode}}<br>
                    GST: {{$profile->gstin}}
                </td>
                <td colspan="3" class="text-end">
                    Invoice No: 22<br>
                    Date: {{\Carbon\Carbon::now()->format('d-m-Y')}}<br>
                    <strong>To</strong><br>
                    Counter Sales<br>
                    State: {{$profile->state}}
                </td>
            </tr>
            
            <tr class="heading">
                <th>Sl.</th>
                <th>Product Name [HSN]</th>
                <th>Gst%</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>

            <tr class="item">
                <td>1</td>
                <td>Jetter Pen Reynolds [4114]</td>
                <td>18</td>
                <td>40.00</td>
                <td>1</td>
                <td>40.00</td>
            </tr>
            <tr class="item">
                <td>1</td>
                <td>Jetter Pen Reynolds [4114]</td>
                <td>18</td>
                <td>40.00</td>
                <td>1</td>
                <td>40.00</td>
            </tr>
        </table>

        <table cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="6" style="border-top: 1px solid #000; border-bottom: none;">
                    Items: 1
                </td>
            </tr>
            <tr>
                <td colspan="6" style="border-bottom: 1px solid #000; border-top: none;">
                    E&amp;OE. Goods once sold cannot be taken back or exchanged
                </td>
            </tr>
            <tr class="totals">
                <td colspan="4"></td>
                <td>Total Taxable:</td>
                <td>₹40.00</td>
            </tr>
            <tr class="totals">
                <td colspan="4"></td>
                <td>Total Tax:</td>
                <td>₹7.20</td>
            </tr>
            <tr class="round-off">
                <td colspan="4"></td>
                <td>Round-off:</td>
                <td>-₹0.20</td>
            </tr>
            <tr class="round-off">
                <td colspan="4"></td>
                <td><strong>Total:</strong></td>
                <td><strong>₹47.00</strong></td>
            </tr>
        </table>

        <div class="text-center" style="margin-top: 20px;">
            <p>GST% 18% &nbsp;&nbsp; Taxable ₹40.00 &nbsp;&nbsp; CGST ₹3.60 &nbsp;&nbsp; SGST ₹3.60</p>
            <p>Thank you. Have a great day!</p>
        </div>

        <div class="text-end" style="margin-top: 20px;">
            <p>For Gst Pro</p>
            <p>Signatory</p>
        </div>
    </div>
</body>
</html>
