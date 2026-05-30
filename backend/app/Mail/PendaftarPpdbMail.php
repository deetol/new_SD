<?php

namespace App\Mail;

use App\Models\PendaftarPpdb;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PendaftarPpdbMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly PendaftarPpdb $pendaftar
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Konfirmasi Pendaftaran PPDB – ' . $this->pendaftar->nomor_pendaftaran,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.pendaftar-ppdb',
        );
    }
}
