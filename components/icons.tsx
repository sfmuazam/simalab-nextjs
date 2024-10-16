import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Box,
  FileSearch,
  FileCheck,
  CircuitBoardIcon,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboardIcon,
  Loader2,
  LogIn,
  LucideIcon,
  LucideProps,
  LucideShoppingBag,
  MoreVertical,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  UserCircle2Icon,
  UserPen,
  UserX2Icon,
  X
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  dashboard: LayoutDashboardIcon,  // Ikon untuk Dashboard
  logo: Command,                  // Ikon untuk Logo aplikasi
  login: LogIn,                   // Ikon untuk Login
  close: X,                       // Ikon untuk Tutup atau Close
  product: LucideShoppingBag,      // Ikon untuk Produk atau Shopping Bag
  spinner: Loader2,               // Ikon untuk Loading Spinner
  kanban: CircuitBoardIcon,        // Ikon untuk Kanban atau Papan Sirkuit
  chevronLeft: ChevronLeft,        // Ikon untuk Navigasi kiri
  chevronRight: ChevronRight,      // Ikon untuk Navigasi kanan
  trash: Trash,                   // Ikon untuk Hapus
  employee: UserX2Icon,           // Ikon untuk Petugas atau Employee
  flask: FlaskConical,                 // Ikon untuk Postingan atau Teks
  page: File,                     // Ikon untuk Halaman atau Dokumen
  userPen: UserPen,               // Ikon untuk Pengguna dengan Pena (Edit)
  user2: UserCircle2Icon,         // Ikon untuk Pengguna
  media: Image,                   // Ikon untuk Media atau Gambar
  settings: Settings,             // Ikon untuk Pengaturan
  billing: CreditCard,            // Ikon untuk Pembayaran atau Kartu Kredit
  ellipsis: MoreVertical,         // Ikon untuk Lainnya atau Ellipsis (titik tiga)
  add: Plus,                      // Ikon untuk Tambah
  warning: AlertTriangle,          // Ikon untuk Peringatan
  user: User,                     // Ikon untuk Pengguna
  arrowRight: ArrowRight,         // Ikon untuk Panah ke kanan
  help: HelpCircle,               // Ikon untuk Bantuan
  fileCheck: FileCheck,                   // Ikon untuk Pizza (ikon kustom)
  fileSearch: FileSearch,                 // Ikon untuk Matahari atau mode terang
  fileText: FileText,                     // Ikon untuk Bulan atau mode gelap
  box: Box,                 // Ikon untuk Laptop atau Perangkat
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"
      ></path>
    </svg>
  ),
  twitter: Twitter,               // Ikon untuk Twitter
  check: Check                    // Ikon untuk Tanda Centang
};
