#!/usr/bin/env python3
"""
Download item images from The Bazaar wiki.gg

Usage:
    python3 download-images.py

Downloads images to: ui/assets/items/
"""

import os
import time
import urllib.request
import urllib.error
from pathlib import Path

# Output directory
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
ASSETS_DIR = PROJECT_DIR / "ui" / "assets" / "items"
ASSETS_DIR.mkdir(parents=True, exist_ok=True)

# All items from the game (curated list of important items)
# Format: item names as they appear in game
ITEMS = [
    # Vanessa Items
    "Powder Keg", "Cannon", "Sniper Rifle", "Tracer Fire", "Incendiary Rounds",
    "Oni Mask", "Lighthouse", "Flamethrower", "Bayonet", "Blunderbuss",
    "Cutlass", "Pistol", "Musket", "Fuse", "Gunpowder", "Cannonball",
    "Double Barrel", "Rocket Launcher", "Thermal Lance", "Railgun",
    "Ramrod", "Chum", "Honing Steel", "Shot Glasses", "Switchblade",
    "Flame Signal", "Hate Leech", "Scimitar of the Deep", "Vampire Squid",
    "Orange Julian", "Sharkclaws", "Port", "Slumbering Primordial",

    # Pygmalien Items
    "Business Card", "Jabalian Drum", "Showcase", "Landscraper", "Safe",
    "Cash Cannon", "ATM", "Bar of Gold", "Chunk of Gold", "Bag of Jewels",
    "Cash Register", "Briefcase", "Spiky Shield", "Force Field",
    "Gavel", "Hatchet", "Streaming Setup", "Lemonade Stand",

    # Dooley Items
    "Core", "Combat Core", "Critical Core", "Companion Core", "Armored Core",
    "Fiber Optics", "Ray Gun", "Dooltron", "Dooltron Mainframe",
    "GPU", "Memory Card", "Battery", "Capacitor", "Motherboard",
    "Monitor Lizard", "Cool LEDs", "Charging Station", "3D Printer",
    "Launcher Core", "Ice 9000", "Weakpoint Detector", "Temporal Navigator",
    "Micro Mach", "Defense Matrix", "DJ Circuit Breaker", "Cooling Fan",

    # Mak Items
    "Peacewrought", "Foul Mushroom", "Rainbow Staff", "Vial Launcher",
    "Potion", "Health Potion", "Regeneration Potion", "Energy Potion",
    "Alembic", "Cauldron", "Apothecary", "Laboratory",
    "Poppy Field", "Spider Mace", "Magnus Femur", "Staff of the Moose",
    "Runic Potion", "Floor Spike", "Barbed Claws", "Incense",
    "Aludel", "Mortar and Pestle", "Library", "Book of Secrets", "Spider Fern",
    "Athanor", "Ice Claw", "Runic Great Axe", "Tome of Yyahan",

    # Stelle Items
    "Flycycle", "Ornithopter", "Boom Boom Bot", "Balloon Bot",
    "Angry Balloon Bot", "Battle Balloon", "Helicopter", "Jetpack",
    "Lightning Rod", "Space Laser", "Stellar Swallowtail", "Skyliner",
    "Caracara", "Aerial Turret", "Gyro Gunsight", "Headset",
    "Clockwork Disc", "Drone Workshop",

    # Jules Items
    "Pizza", "Rice Cooker", "Grill", "Wok", "Oven", "Dishwasher",
    "Spices", "Curry", "Chocolate Bar", "Truffles", "Butter",
    "Hot Box", "Imu", "Giant Lollipop", "Freezer", "Stove", "Cooler",
    "Gingerbread House", "Cutting Board", "Bubblegum Floor", "Excellent Vintage",
    "Feast",

    # Common/Neutral Items
    "Bandages", "Brick Buddy", "Duct Tape", "Bootstraps", "Belt",
    "Claws", "Brass Knuckles", "Boomerang", "Slingshot", "Crossbow",
    "Ballista", "Arbalest", "Catapult", "Trebuchet",

    # Economy Items
    "Abacus", "Astrolabe", "Loupe", "Pearl", "Emerald", "Amber",

    # Shields/Defense
    "Shield", "Buckler", "Tower Shield", "Barrier", "Bunker", "Fort",

    # Tech Items
    "Laser Pistol", "Arc Blaster", "Omega Ray", "Alpha Ray", "Beta Ray",

    # More popular items
    "Katana", "Cleaver", "Dagger", "Sword", "Axe", "Handaxe",
    "Crane", "Fork Lift", "Submarine", "Torpedo", "Anchor",
    "Fishing Net", "Harpoon", "Trident",
]

def download_image(item_name):
    """Download a single item image from wiki.gg"""
    # Format for wiki URL
    formatted = item_name.replace(" ", "_")

    # wiki.gg direct image URL pattern
    url = f"https://thebazaar.wiki.gg/images/{formatted}.png"

    # Local filename (lowercase, underscores)
    filename = item_name.lower().replace(" ", "_") + ".png"
    filepath = ASSETS_DIR / filename

    # Skip if already exists
    if filepath.exists():
        print(f"  [SKIP] {item_name} (already exists)")
        return True

    try:
        # Set up request with user agent
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) Bazaar-Companion/1.0'
        })

        with urllib.request.urlopen(req, timeout=10) as response:
            data = response.read()

            # Check if we got actual image data (PNG starts with specific bytes)
            if data[:4] == b'\x89PNG':
                with open(filepath, 'wb') as f:
                    f.write(data)
                print(f"  [OK] {item_name}")
                return True
            else:
                print(f"  [FAIL] {item_name} (not a valid PNG)")
                return False

    except urllib.error.HTTPError as e:
        if e.code == 404:
            print(f"  [404] {item_name}")
        else:
            print(f"  [ERR] {item_name}: HTTP {e.code}")
        return False
    except Exception as e:
        print(f"  [ERR] {item_name}: {e}")
        return False

def main():
    print("=" * 50)
    print("  Bazaar Companion - Image Downloader")
    print("=" * 50)
    print(f"\nDownloading to: {ASSETS_DIR}")
    print(f"Items to download: {len(ITEMS)}\n")

    success = 0
    failed = 0
    skipped = 0

    for i, item in enumerate(ITEMS, 1):
        print(f"[{i}/{len(ITEMS)}]", end="")

        filepath = ASSETS_DIR / (item.lower().replace(" ", "_") + ".png")
        if filepath.exists():
            skipped += 1
            print(f"  [SKIP] {item}")
            continue

        if download_image(item):
            success += 1
        else:
            failed += 1

        # Be nice to the server
        time.sleep(0.3)

    print("\n" + "=" * 50)
    print(f"Done! Success: {success}, Failed: {failed}, Skipped: {skipped}")
    print(f"Images saved to: {ASSETS_DIR}")

if __name__ == "__main__":
    main()
