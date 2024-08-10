<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use Barryvdh\DomPDF\PDF;
use App\Mail\InvoiceMail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\BaseController;
use App\Notifications\InvoiceMailNotification;
use Illuminate\Support\Facades\Log; // Import Log facade
use Illuminate\Support\Facades\Storage; // Import Storage facade

class InvoiceController extends BaseController
{
    protected $invoice;

    public function __construct(PDF $invoice)
    {
        $this->invoice = $invoice;
    }


    public function generateInvoice()
    {
        $user = auth()->user();
        $profile = $user->profile()->with('transaction')->first();
    
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
            $data = [
            'user' => $user,
            'profile' => $profile,
            'transaction' => $profile->transaction,
        ];
        $this->invoice->loadView('invoice.invoice', $data); // Call loadView() on the instance
        //   $pdf = Pdf::loadView('invoice.invoice', ['profiles' => $data]);
        $invoice = $this->invoice->output(); // Get the PDF content

        $filePath = 'public/invoices/invoice_' . time() . '.pdf';  //to store pdf in app folder remove the public folder

        Storage::put($filePath, $this->invoice->output());
  
        Mail::to("ghadiganesh2002@gmail.com")->send(new InvoiceMailNotification($filePath));

        $this->invoice->setPaper('A4', 'portrait');
        return $this->invoice->download('invoice.pdf');

    }

}
