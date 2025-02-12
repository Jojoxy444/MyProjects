import curses
import os
import platform
import psutil
import subprocess
import resource


def show_system_info(stdscr):
    stdscr.clear()
    max_y, max_x = stdscr.getmaxyx()
    row = 0

    os_version = platform.platform()
    stdscr.addstr(row, 0, f"OS Version: {os_version}")
    row += 1

    uptime_seconds = psutil.boot_time()

    try:
        if platform.system() == "Darwin":
            uptime = subprocess.check_output(
                'uptime', shell=True).decode('utf-8').strip()
        else:
            uptime = subprocess.check_output(
                'uptime -p', shell=True).decode('utf-8').strip()
    except subprocess.CalledProcessError as e:
        uptime = "N/A (Error retrieving uptime)"

    stdscr.addstr(row, 0, f"Uptime: {uptime}")
    row += 1

    kernel_version = platform.release()
    stdscr.addstr(row, 0, f"Kernel Version: {kernel_version}")
    row += 1

    cpu_info = f"CPU: {psutil.cpu_count(logical=True)} cores"
    stdscr.addstr(row, 0, cpu_info)
    row += 1

    memory_info = psutil.virtual_memory()
    memory_total = memory_info.total // (1024 ** 3)
    memory_available = memory_info.available // (1024 ** 3)
    stdscr.addstr(row, 0, f"Memory: {memory_total}GB total, {memory_available}GB available")
    row += 1

    disk_info = psutil.disk_usage('/')
    disk_total = disk_info.total // (1024 ** 3)
    disk_used = disk_info.used // (1024 ** 3)
    disk_free = disk_info.free // (1024 ** 3)
    stdscr.addstr(row, 0, f"Disk: {disk_total}GB total, {disk_used}GB used, {disk_free}GB free")
    row += 1

    try:
        file_limit = subprocess.check_output(
            'ulimit -n', shell=True).decode('utf-8').strip()
    except subprocess.CalledProcessError as e:
        file_limit = "N/A"

    stdscr.addstr(row, 0, f"Open File Limit: {file_limit}")
    row += 1

    try:
        process_limit = resource.getrlimit(resource.RLIMIT_NPROC)[0]
        stdscr.addstr(row, 0, f"Process Limit: {process_limit}")
    except Exception as e:
        stdscr.addstr(row, 0, "Process Limit: Non disponible")
    row += 1

    stdscr.addstr(
        row, 0, "Press 'p' to see installed packages, any other key to return.")
    stdscr.refresh()
    key = stdscr.getch()

    if key == ord('p'):
        show_installed_packages(stdscr)
    else:
        return


def show_installed_packages(stdscr):
    stdscr.clear()
    max_y, max_x = stdscr.getmaxyx()
    row = 0

    try:
        if platform.system() == "Darwin":  
            try:
                installed_packages = subprocess.check_output(
                    ['brew', 'list'], text=True).splitlines()
            except subprocess.CalledProcessError as e:
                stdscr.addstr(
                    row, 0, f"Error: Homebrew non installé ou erreur lors de la récupération des paquets.")
                stdscr.refresh()
                stdscr.getch()
                return
        elif platform.system() == "Linux":
            try:
                installed_packages = subprocess.check_output(
                    ['dpkg', '-l'], text=True).splitlines()
            except subprocess.CalledProcessError:
                try:
                    installed_packages = subprocess.check_output(
                        ['yum', 'list', 'installed'], text=True).splitlines()
                except subprocess.CalledProcessError:
                    stdscr.addstr(
                        row, 0, "Error: Aucun gestionnaire de paquets trouvé (dpkg ou yum).")
                    stdscr.refresh()
                    stdscr.getch()
                    return
        else:
            stdscr.addstr(row, 0, "Plateforme non supportée.")
            stdscr.refresh()
            stdscr.getch()
            return

    except Exception as e:
        stdscr.addstr(row, 0, f"Error: {e}")
        stdscr.refresh()
        stdscr.getch()
        return

    items_per_page = max_y - 2
    total_items = len(installed_packages)
    current_page = 0
    total_pages = (total_items + items_per_page - 1) // items_per_page

    while True:
        stdscr.clear()

        start_idx = current_page * items_per_page
        end_idx = min(start_idx + items_per_page, total_items)

        for i, package in enumerate(installed_packages[start_idx:end_idx]):
            stdscr.addstr(i, 0, package[:max_x])

        stdscr.addstr(max_y - 1, 0, f"Page {current_page + 1}/{total_pages} - Press 'n' for next, 'p' for previous, any other key to exit.")

        stdscr.refresh()
        key = stdscr.getch()

        if key == ord('n') and current_page < total_pages - 1:
            current_page += 1
        elif key == ord('p') and current_page > 0:
            current_page -= 1
        else:
            break


def launch_menu():
    curses.wrapper(main_menu)


def show_network_info(stdscr):
    stdscr.clear()
    row = 0
    max_y, max_x = stdscr.getmaxyx()

    lines = []  

    
    lines.append("Interfaces Réseau:")
    for interface, addrs in psutil.net_if_addrs().items():
        lines.append(f"Interface: {interface}")
        for addr in addrs:
            lines.append(f"  Adresse: {addr.address}")

    
    lines.append("Paquets Transmis/Reçus:")
    for interface, stats in psutil.net_io_counters(pernic=True).items():
        lines.append(f"Interface: {interface}")
        lines.append(f"  Paquets envoyés: {stats.bytes_sent}")
        lines.append(f"  Paquets reçus: {stats.bytes_recv}")

    
    if platform.system() == "Linux":
        lines.append("Forwarding de paquet:")
        with open('/proc/sys/net/ipv4/ip_forward', 'r') as f:
            ip_forward = f.read().strip()
        lines.append(f"  IP Forwarding Enabled: {'Oui' if ip_forward == '1' else 'Non'}")
    else:
        lines.append("Forwarding de paquet: Non applicable sur ce système")

    
    def display_lines(start_index):
        stdscr.clear()
        nonlocal row
        row = 0
        for i in range(start_index, min(start_index + max_y - 2, len(lines))):
            if row < max_y - 2:
                
                stdscr.addstr(row, 0, lines[i][:max_x])
                row += 1

        if start_index + max_y - 2 < len(lines):
            stdscr.addstr(
                row, 0, "Appuyez sur 'n' pour voir plus ou une autre touche pour retourner au menu...")
        else:
            stdscr.addstr(
                row, 0, "Appuyez sur une touche pour revenir au menu...")

        stdscr.refresh()

    start_index = 0
    display_lines(start_index)

    while True:
        key = stdscr.getch()
        if key == ord('n'):
            if start_index + max_y - 2 < len(lines):
                start_index += max_y - 2
            else:
                start_index = 0
            display_lines(start_index)
        else:
            break


def show_processes(stdscr):
    stdscr.clear()
    row = 0
    header = "PID   Nom            Utilisateur  Statut    PPID   Commande"
    stdscr.addstr(row, 0, header)
    row += 1

    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'username']):
        try:
            p = psutil.Process(proc.info['pid'])
            processes.append({
                'pid': proc.info['pid'],
                'name': proc.info['name'],
                'username': proc.info['username'],
                'status': p.status(),
                'ppid': p.ppid(),
                'cmdline': p.cmdline()
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    def display_processes(start_index):
        nonlocal row
        stdscr.clear()
        row = 0
        stdscr.addstr(row, 0, header)
        row += 1
        max_lines = curses.LINES - 2

        for i, proc in enumerate(processes[start_index:start_index + max_lines - 1]):
            if row >= max_lines:
                break
            cmdline = " ".join(proc['cmdline']) if proc['cmdline'] else ""
            stdscr.addstr(row, 0, f"{proc['pid']:5} {proc['name'][:15]:15} {proc['username'][:10]:10} {proc['status']:10} {proc['ppid']:5} {cmdline[:curses.COLS - 40]}")
            row += 1

        if start_index + max_lines - 1 < len(processes):
            stdscr.addstr(
                curses.LINES - 1, 0, "Press 'p' for more processes, or 'k' to kill a process.")
        else:
            stdscr.addstr(
                curses.LINES - 1, 0, "Press 'k' to kill a process, or any other key to return.")

        stdscr.refresh()

    start_index = 0
    display_processes(start_index)

    while True:
        key = stdscr.getch()

        if key == ord('k'):
            stdscr.addstr(row + 1, 0, "Enter PID to kill:")
            stdscr.refresh()
            pid_str = ""
            while True:
                char = stdscr.getch()
                if char in (curses.KEY_ENTER, 10, 13):
                    break
                elif char == 27:
                    return
                elif char >= 32 and char <= 126:
                    pid_str += chr(char)
                    stdscr.addstr(row + 2, 0, f"PID: {pid_str}")
                    stdscr.refresh()

            try:
                pid = int(pid_str)
                if pid in [p['pid'] for p in processes]:
                    proc = psutil.Process(pid)
                    proc.terminate()
                    stdscr.addstr(row + 3, 0, f"Process {pid} terminated.")
                else:
                    stdscr.addstr(row + 3, 0, f"Process {pid} not found.")
            except ValueError:
                stdscr.addstr(row + 3, 0, "Invalid PID entered.")
            except psutil.NoSuchProcess:
                stdscr.addstr(row + 3, 0, f"Process {pid} does not exist.")
            except psutil.AccessDenied:
                stdscr.addstr(
                    row + 3, 0, f"Access denied to terminate process {pid}.")
            stdscr.refresh()

        elif key == ord('p'):
            start_index += curses.LINES - 2  
            if start_index >= len(processes):
                start_index = 0  
            display_processes(start_index)

        else:
            break

    stdscr.refresh()


def main_menu(stdscr):
    curses.curs_set(0)
    curses.curs_set(0)
    curses.start_color()
    curses.init_pair(1, curses.COLOR_BLACK, curses.COLOR_WHITE)
    stdscr.clear()

    menu = ['Informations Générales', 'Réseau', 'Processus', 'Quitter']
    current_row = 0

    while True:
        stdscr.clear()
        h, w = stdscr.getmaxyx()

        for idx, row in enumerate(menu):
            x = w//2 - len(row)//2
            y = h//2 - len(menu)//2 + idx
            if idx == current_row:
                stdscr.attron(curses.color_pair(1))
                stdscr.addstr(y, x, row)
                stdscr.attroff(curses.color_pair(1))
            else:
                stdscr.addstr(y, x, row)

        key = stdscr.getch()

        if key == curses.KEY_UP and current_row > 0:
            current_row -= 1
        elif key == curses.KEY_DOWN and current_row < len(menu) - 1:
            current_row += 1
        elif key == ord('\n'):
            if current_row == 0:
                show_system_info(stdscr)
            elif current_row == 1:
                show_network_info(stdscr)
            elif current_row == 2:
                show_processes(stdscr)
            elif current_row == 3:
                break

        stdscr.refresh()
