<?php

namespace App\Http\Controllers\Api;


use Log;
use File;
use Response;
use Mpdf\Mpdf;
use App\Models\Profile;
use Barryvdh\DomPDF\PDF;
use App\Mail\InvoiceMail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\BaseController;
// use Illuminate\Support\Facades\Log; // Import Log facade
use App\Notifications\InvoiceMailNotification;
use Illuminate\Support\Facades\Storage; // Import Storage facade

class InvoiceController extends BaseController
{
    protected $invoice;

    public function __construct(PDF $invoice)
    {
        $this->invoice = $invoice;
    }


    // public function generateInvoice()
    // {
    //     $user = auth()->user();
    //     $profile = $user->profile()->with('transaction')->first();
    
    //     if (!$profile) {
    //         return response()->json(['message' => 'Profile not found'], 404);
    //     }
    //         $data = [
    //         'user' => $user,
    //         'profile' => $profile,
    //         'transaction' => $profile->transaction,
    //     ];


    //     // $html = view('invoice.invoice', $data)->render();
    //     // $this->invoice->loadHTML($html);

    //     $this->invoice->loadView('invoice.invoice', $data); // Call loadView() on the instance
    //     $invoice = $this->invoice->output(); // Get the PDF content

    //     $filePath = 'public/invoices/invoice_' . time() . '.pdf';  //to store pdf in app folder remove the public folder

    //     Storage::put($filePath, $this->invoice->output());
  
    //     Mail::to("ghadiganesh2002@gmail.com")->send(new InvoiceMail($filePath));

    //     $this->invoice->setPaper('A4', 'portrait');
    //     return $this->invoice->download('invoice.pdf');

    // }


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

        // Render the Blade view to HTML
        $html = view('invoice.invoice', $data)->render();

        // Create a new mPDF instance
        $mpdf = new Mpdf();

        // Write HTML to the PDF
        $mpdf->WriteHTML($html);

        // Define the file path for saving the PDF
        $filePath = 'public/invoices/invoice_' . time(). $user->id . '.pdf'; // Store in 'storage/app/invoices'
        $fileName = basename($filePath); // Extracts 'invoice_{timestamp}{user_id}.pdf'
        $profile->invoice_name = $fileName;
        $profile->save();
        // Save PDF to storage
        Storage::put($filePath, $mpdf->Output('', 'S')); // Output as string and save to storage

        // Send the PDF as an email attachment
        if($user->email){
            Mail::to($user->email)->send(new InvoiceMail($filePath));
        }

      
        // Output the PDF for download
        // return $mpdf->Output('invoice.pdf', 'D'); // Download the PDF
         return $fileName;
    }


    public function showInvoice(string $files){
        $path = storage_path('app/public/invoices/'.$files);

        if(!file_exists($path)){
           abort(404, 'not found');
        }

        $file = File::get($path);
        $type = \File::mimeType($path);
        // $type = 'application/pdf';
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        $response->header('Content-Disposition', 'inline; filename="' . $files . '"');

        return $response;
   }
   
   public function downloadInvoice(string $files)
   {
       // Generate the full path to the invoice in the public storage
       $path = storage_path('app/public/invoices/' . $files);
   
       // Check if the file exists
       if (!file_exists($path)) {
           abort(404, 'Invoice not found');
       }
   
       // Get the file content and MIME type
       $fileContent = File::get($path);
       $mimeType = \File::mimeType($path);
   
       // Create the response for the file download
       $response = Response::make($fileContent, 200);
       $response->header("Content-Type", $mimeType);
       $response->header('Content-Disposition', 'attachment; filename="' . $files . '"'); // Set attachment to force download
   
       return $response;
   }


}